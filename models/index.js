// const UserModel = require("./user");
// const MoodModel = require("./mood");
// const GoalModel = require("./goal");

// module.exports = {
//     UserModel,
//     MoodModel,
//     GoalModel
// };

const db = require('../db');
const UserModel = require('./user');
const MoodModel = require('./mood');
const GoalModel = require('./goal');

//* ASSOCIATIONS
UserModel.hasMany(MoodModel);
UserModel.hasMany(GoalModel);

MoodModel.belongsTo(UserModel);
GoalModel.belongsTo(UserModel);

module.exports = {
    dbConnection: db,
    models: {
        UserModel,
        MoodModel,
        GoalModel
    }
};