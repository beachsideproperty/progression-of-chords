const {
  models: { User },
} = require('../../db');
const { decodeToken } = require('../../utils');

const requireToken = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (authorization) {
      let id;
      try {
        id = decodeToken(authorization, 'customer').id;
      } catch (error) {
        id = decodeToken(authorization, 'admin').id;
      }

      const user = await User.findByPk(id);
      if (user) {
        req.user = user;
        next();
        return;
      }
    }
    res.sendStatus(401);
  } catch (error) {
    next(error);
  }
};

const requireAdminToken = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (authorization) {
      const { id } = decodeToken(authorization, 'admin');

      const user = await User.findByPk(id);
      if (user) {
        req.user = user;
        next();
        return;
      }
    }
    res.sendStatus(401);
  } catch (error) {
    next(error);
  }
};

module.exports = { requireToken, requireAdminToken };
