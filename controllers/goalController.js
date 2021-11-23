let express = require("express");
let router = express.Router();

let validateSession = require("../middleware/sessionValidate");
const { models } = require('../models');

//SUCCESS - user create goal entry 
router.post('/create', validateSession, async (req, res) => {
    const { twoWeekG, twoMonthG } = req.body;
    const { id } = req.user;
    const goalEntry = {
        twoWeekG,
        twoMonthG,
        userId: id
    }
    try {
        const newGoalEntry = await models.GoalModel.create(goalEntry);
        res.status(200).json(newGoalEntry);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

//SUCCESS - user get all their goal entries 
router.get("/mygoalentries", validateSession, async (req, res) => {
    let { id } = req.user;
    try {
        const userGoals = await models.GoalModel.findAll({
            where: {
                userId: id
            }
        });
        res.status(200).json(userGoals);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

//SUCCESS - user edit goal entry
router.put("/updategoal/:goalId", validateSession, async (req, res) => {
    const { twoWeekG, twoMonthG } = req.body;
    const goalId = req.params.goalId;
    const userId = req.user.id;
    const query = {
        where: {
            id: goalId,
            userId: userId
        }
    };
    const updatedGoalEntry = {
        twoWeekG: twoWeekG,
        twoMonthG: twoMonthG
    }
    try {
        const update = await models.GoalModel.update(updatedGoalEntry, query);
        res.status(200).json(update);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

//SUCCESS - user delete a goal entry 
router.delete('/delete/:id', validateSession, async (req, res) => {
    const userId = req.user.id;
    const goalId = req.params.id
    try {
        const query = {
            where: {
                id: goalId,
                userId: userId
            }
        }
        await models.GoalModel.destroy(query)
        res.status(200).json({ message: 'Item has successfully been deleted' })
    } catch (err) {
        res.status(500).json({
            message: 'Failed to delete item'
        })
    }
})
module.exports = router;