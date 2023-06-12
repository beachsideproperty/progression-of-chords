const { Sequelize } = require('sequelize');
const db = require('../db');

const Mood = db.define('Mood', {
  mood: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  date: {
    type: Sequelize.DATEONLY,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
});

module.exports = Mood;
