const router = require('express').Router();
const {
  models: { Mood },
} = require('../../db');
const { requireToken } = require('../middleware');

// GET /api/moods/
router.get('/', requireToken, async (req, res, next) => {
  try {
    const moods = await Mood.findAll({});
    res.send(moods);
  } catch (err) {
    next(err);
  }
});

// POST /api/moods
router.post('/', requireToken, async (req, res, next) => {
  try {
    const { mood, date, userId } = req.body;

    const [newMood, created] = await Mood.findOrCreate({
      where: {
        date,
        userId,
      },
      defaults: {
        mood,
        date,
        userId,
      },
    });

    if (!created) {
      await newMood.update({ mood });
    }

    res.status(201).json({ mood: newMood });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// DELETE /api/moods/:id
router.delete('/:id', requireToken, async (req, res, next) => {
  try {
    const mood = await Mood.findOne({ where: { id: req.params.id } });
    if (!mood) {
      res.sendStatus(404);
    } else {
      await mood.destroy();
      res.sendStatus(204);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
