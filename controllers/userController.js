const router = require('express').Router();
const { models } = require('../models');

const { UniqueConstraintError } = require("sequelize/lib/errors");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
// let validateSession = require("../middleware/sessionValidate");
let validateAdmin = require("../middleware/adminValidate");



//SUCCESS in registering new user with or without role field.  
//SUCCESS in registering new user with admin field.
router.post("/register", async (req, res) => {

    let { email, password, firstName, lastName, role } = req.body;

    try {
        const User = await models.UserModel.create({
            email,
            password: bcrypt.hashSync(password, 13),
            firstName,
            lastName,
            role
        });

        let token = jwt.sign({ id: User.id, email: User.email }, process.env.JWT_SECRET, { expiresIn: 60 * 60 * 24 });
        res.status(201).json({
            message: "User successfully registered",
            User: User,
            sessionToken: token,
        });
    }
    catch (err) {
        if (err instanceof UniqueConstraintError) {
            res.status(409).json({
                message: "Email already in use",
            });
        } else {
            res.status(500).json({
                message: `Error: ${err}`,
            });
        }
    }

});

//SUCCESS in logging in regular user
//SUCCESS in logging in admin user
router.post("/login", async (req, res) => {

    let { email, password } = req.body;

    try {
        let loginUser = await models.UserModel.findOne({
            where: {
                email: email,
            },
        });

        if (loginUser) {

            let passwordComparison = await bcrypt.compare(password, loginUser.password);
            if (passwordComparison) {
                let token = jwt.sign({ id: loginUser.id }, process.env.JWT_SECRET, { expiresIn: 60 * 60 * 24 });

                res.status(200).json({
                    user: loginUser,
                    message: "User successfully logged in!",
                    sessionToken: token
                });
            }
            else {
                res.status(401).json({
                    message: "Incorrect email or password"
                })
            }
        } else {
            res.status(401).json({
                message: 'Incorrect email or password'
            });
        }

    }
    catch (error) {

        res.status(500).json({
            message: "Failed to log user in",
        });

    }

});


//!ADMIN ACCESS CONTROL
// ADMIN GET ALL USERS
//SUCCESS without validateAdmin. Okay - will use ternary for page only seen for admins.
router.get('/admin/allusers', validateAdmin, async (req, res) => {

    try {
        const users = await models.UserModel.findAll();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});


//SUCCESS without validateAdmin. Okay - will use ternary for page only seen for admins. 
//!Admin can update but user cannot login with new data. Why?
router.put("/admin/updateuserinfo/:id", async (req, res) => {  
    const updateUserInfo = {
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        role: req.body.role
    }
    const query = { where: { id: req.params.id } };
    try {
        const foundUser = await models.UserModel.findOne(query);
        if (foundUser) {
            await models.UserModel.update(updateUserInfo, query);
            res.status(201).json({ updateUserInfo: updateUserInfo })
        } else {
            res.status(201).json({ Error: "Invalid" })
        }
    }
    catch (error) {
        res.status(500).json({
            message: "Failed to update user info",
        });
    }
});

// Admin delete user
// SUCCESS
// "not authorized" when logged in as a regular user
// Will likely need a "get all users" to pass down props for paramater id 

router.delete("/admin/delete/:id", validateAdmin, async(req, res) =>{
    const userId = req.params.id;

    try {
        const userDeleted = await models.UserModel.destroy({
            where: {id:userId }
        })
        res.status(200).json({
            message: "User deleted",
            userDeleted
        })

    }catch (err) {
        res.status(500).json({
            message: `Failed to delete user.: ${err}`
        })
    }
})




module.exports = router;