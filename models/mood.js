//WILL NEED TO ADD DATE PROPERTY

const {DataTypes} = require("sequelize");
const db = require("../db");
const Mood = db.define("mood", {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
      },
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
      }
      // date: {
      //   type: DataTypes.DATEONLY,
      //   get: function() {
      //     return moment.utc(this.getDataValue('date')).format('YYYY-MM-DD');
      //  }
      //}
    }, 
    // {
    //   tableName: 'mood'
    // }
    
    );

    module.exports = Mood
