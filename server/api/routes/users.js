const router = require('express').Router();
const {
  models: { User },
} = require('../../db');
const { requireToken, requireAdminToken } = require('../middleware');

// GET /api/users/
router.get('/', requireAdminToken, async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'email', 'firstName', 'lastName'],
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

// GET /api/users/:userId
router.get('/:userId', requireToken, async (req, res, next) => {
  try {
    const { userId } = req.params;
    const user = await User.findOne({
      where: {
        id: userId,
      },
      attributes: ['id', 'email', 'firstName', 'lastName'],
    });

    if (user) {
      if (req.user.role === 'admin' || req.user.id === user.id) {
        res.json(user);
      } else {
        res.status(403).send('You are not authorized to access this resource.');
      }
    } else {
      res.status(404).send("User doesn't exist.");
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// POST /api/users/
router.post('/', requireAdminToken, async (req, res, next) => {
  try {
    const newUser = await User.create(req.body);
    res.status(201).json(newUser);
  } catch (e) {
    next(e);
  }
});

// PUT /api/users/:userId
router.put('/:id', requireToken, async (req, res, next) => {
  try {
    const [numUpdated] = await User.update(req.body, {
      where: { id: req.params.id },
    });
    if (numUpdated === 0) {
      res.sendStatus(404);
      return;
    }
    res.sendStatus(204);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

// DELETE /api/users/:userId
router.delete('/:id', requireAdminToken, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    await user.destroy();
    res.send(user);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
