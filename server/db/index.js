const db = require('./db');

const User = require('./models/User');
const Mood = require('./models/Mood');

Mood.belongsTo(User);
User.hasMany(Mood);

module.exports = {
  db,
  models: {
    User,
    Mood,
  },
};
