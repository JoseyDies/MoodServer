//WILL NEED TO ADD DATE PROPERTY 

const {DataTypes} = require("sequelize");
const db = require("../db");
const Goals = db.define("goals", {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
      },
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
