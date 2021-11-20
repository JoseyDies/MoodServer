const jwt = require("jsonwebtoken");
// const {UserModel} = require("../models");
const { models } = require('../models');



const validateAdmin = async (req, res, next) => {
    if (req.method == "OPTIONS"){
        next();
    }else if(
        req.headers.authorization 
    ){
        const {authorization} = req.headers;
        console.log("authorization -->", authorization);
        const payload = authorization
        ? jwt.verify(authorization, process.env.JWT_SECRET) : undefined
        console.log("payload -->", payload);
        if(payload){
            let foundUser = await models.UserModel.findOne({where: {id:payload.id, role: "admin"}
            
            });
            console.log("foundUser -->", foundUser);
            if (foundUser){
                console.log("request -->", req);
                req.user = foundUser;
                next();
            }else{
                res.status(400).send({message: "Not Authorized"});
            }
        }else{
            res.status(401).send({message: "Invalid token"});
            }
        } else{
            res.status(403).send({message: "Forbidden"});
        }
    
};


module.exports = validateAdmin;
