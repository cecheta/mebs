const express = require('express');
const authMiddleware = require('../middleware/auth');
const Playlist = require('../models/playlist');

const router = express.Router();

router.post('/new', authMiddleware, async (req, res) => {
  // TODO: Playlist with name already exists
  const playlist = new Playlist({
    name: req.body.name,
  });
  await playlist.save();

  const user = req.user;
  user.playlists.push(playlist.id);
  await user.save();

  res.status(201).send(playlist);
});

router.post('/add/:id', authMiddleware, async (req, res) => {
  try {
    const playlist = await Playlist.findById(req.params.id);
    playlist.songs.push(req.body.song);
    await playlist.save();
    res.status(201).send(playlist);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

module.exports = router;
