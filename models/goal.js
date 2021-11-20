
const {DataTypes} = require("sequelize");
const db = require("../db");
const Goals = db.define("goals", {

      twoWeekG: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      twoMonthG: {
        type: DataTypes.STRING,
        allowNull: true,
      },

    });

    module.exports = Goals
