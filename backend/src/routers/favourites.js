const express = require('express');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

router.get('/', authMiddleware, async (req, res) => {
  const user = req.user;
  res.send({
    favourites: user.favourites,
  });
});

router.post('/artist', authMiddleware, async (req, res) => {
  const user = req.user;
  const id = req.body.id;

  try {
    if (user.favourites.artists.includes(id)) {
      res.status(409).send({ error: `${id} already in favourites` });
    } else {
      user.favourites.artists.push(id);
      await user.save();
      res.status(201).send();
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

router.post('/album', authMiddleware, async (req, res) => {
  const user = req.user;
  const id = req.body.id;

  try {
    if (user.favourites.albums.includes(id)) {
      res.status(409).send({ error: `${id} already in favourites` });
    } else {
      user.favourites.albums.push(id);
      await user.save();
      res.status(201).send();
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

router.delete('/artist/:id', authMiddleware, async (req, res) => {
  const user = req.user;
  const id = req.params.id;
  const artists = user.favourites.artists;

  try {
    if (!user.favourites.artists.includes(id)) {
      res.status(409).send({ error: `${id} not in favourites` });
    } else {
      user.favourites.artists = artists.filter((artist) => artist !== id);
      await user.save();
      res.send();
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

router.delete('/album/:id', authMiddleware, async (req, res) => {
  const user = req.user;
  const id = req.params.id;
  const albums = user.favourites.albums;

  try {
    if (!user.favourites.albums.includes(id)) {
      res.status(409).send({ error: `${id} not in favourites` });
    } else {
      user.favourites.albums = albums.filter((album) => album !== id);
      await user.save();
      res.send();
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

module.exports = router;
