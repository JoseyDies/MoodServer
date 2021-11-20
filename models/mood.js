
const {DataTypes} = require("sequelize");
const db = require("../db");
const Mood = db.define("mood", {

      sleep: {
        type: DataTypes.ENUM("Terrible", "Okay", "Wonderful"),
        allowNull: false,
      },

      energy: {
        type: DataTypes.ENUM("Low", "Average", "High"),
        allowNull: false,
      },
      appetite: {
        type: DataTypes.ENUM("Low", "Average", "Ravenous"),
        allowNull: false,
      },
      overallMood: {
        type: DataTypes.ENUM("Very sad", "Somewhat sad", "Neutral", "Happy", "Elated"),
        allowNull: false,
      },
      moodText: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    }, {
      tableName: 'mood'
    });

    module.exports = Mood
