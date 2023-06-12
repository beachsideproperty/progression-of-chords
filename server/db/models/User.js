const Sequelize = require('sequelize');
const db = require('../db');
const { hashPassword: hashPasswordUtil } = require('../../utils');

const User = db.define('user', {
  password: {
    type: Sequelize.STRING,
  },
  firstName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true,
      isEmail: true,
    },
  },
  role: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: 'customer',
    isIn: ['admin', 'customer'],
  },
});

module.exports = User;

const hashPassword = async (user) => {
  if (user.changed('password')) {
    user.password = await hashPasswordUtil(user.password);
  }
};

User.beforeCreate(hashPassword);
User.beforeUpdate(hashPassword);
User.beforeBulkCreate((users) => Promise.all(users.map(hashPassword)));
