const express = require('express');
const axios = require('../axios/axios-spotify');
const authMiddleware = require('../middleware/auth');
const Playlist = require('../models/playlist');

const router = express.Router();

router.get('/', authMiddleware, async (req, res) => {
  const user = req.user;
  await user.populate('playlists').execPopulate();
  res.send(user.playlists);
});

router.get('/:id', authMiddleware, async (req, res) => {
  const user = req.user;
  const id = req.params.id;
  if (!user.playlists.includes(id)) {
    res.status(404).send({ error: `${id} could not be found` });
  } else {
    const playlist = await Playlist.findById(id);
    const songs = playlist.songs;

    // TODO: No songs in playlist
    const response = await axios.get(`/v1/tracks?ids=${songs.join(',')}`);
    res.send({
      name: playlist.name,
      songs: response.data.tracks,
    });
  }
});

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
