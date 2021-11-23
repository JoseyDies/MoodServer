let express = require("express");
let router = express.Router();

let validateSession = require("../middleware/sessionValidate");
const { models } = require('../models');

//SUCCESS - user create mood entry 
router.post('/create', validateSession, async (req, res) => {
    const { sleep, energy, appetite, overallMood, moodText } = req.body;
    const { id } = req.user;
    const moodEntry = {
        sleep,
        energy,
        appetite,
        overallMood,
        moodText,
        userId: id
    }
    try {
        const newMoodEntry = await models.MoodModel.create(moodEntry);
        res.status(200).json(newMoodEntry);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

module.exports = router;

//SUCCESS - user get all their mood entries 
router.get("/mymoodentries", validateSession, async (req, res) => {
    let { id } = req.user;
    try {
        const userMoods = await models.MoodModel.findAll({
            where: {
                userId: id
            }
        });
        res.status(200).json(userMoods);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

//SUCCESS - user update mood entry 
router.put("/update/:moodId", validateSession, async (req, res) => {
    const { sleep, energy, appetite, overallMood, moodText } = req.body;
    const moodId = req.params.moodId;
    const userId = req.user.id;
    const query = {
        where: {
            id: moodId,
            userId: userId
        }
    };
    const updatedMoodEntry = {
        sleep: sleep,
        energy: energy,
        appetite: appetite,
        overallMood: overallMood,
        moodText: moodText
    }
    try {
        const update = await models.MoodModel.update(updatedMoodEntry, query);
        res.status(200).json(update);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

//SUCCESS - user delete mood entry
router.delete('/delete/:id', validateSession, async (req, res) => {
    const userId = req.user.id;
    const moodId = req.params.id
    try {
        const query = {
            where: {
                id: moodId,
                userId: userId
            }
        }
        await models.MoodModel.destroy(query)
        res.status(200).json({ message: 'Item has successfully been deleted' })
    } catch (err) {
        res.status(500).json({
            message: 'Failed to delete item'
        })
    }
})
module.exports = router;