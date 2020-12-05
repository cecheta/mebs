const express = require('express');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

router.post('/favourites/artist', authMiddleware, async (req, res) => {
  const user = req.user;
  const id = req.body.id;

  try {
    user.favourites.artists.push(id);
    await user.save();
    res.status(201).send();
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

router.delete('/favourites/artist/:id', authMiddleware, async (req, res) => {
  const user = req.user;
  const id = req.params.id;
  const artists = user.favourites.artists;

  try {
    user.favourites.artists = artists.filter((artist) => artist !== id);
    await user.save();
    res.send();
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

module.exports = router;
