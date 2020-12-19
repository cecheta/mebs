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

    let tracks = [];
    if (songs.length > 0) {
      tracks = (await axios.get(`/v1/tracks?ids=${songs.join(',')}`)).data.tracks;
    }

    res.send({
      name: playlist.name,
      songs: tracks,
    });
  }
});

router.post('/new', authMiddleware, async (req, res) => {
  const name = req.body.name;
  const user = req.user;
  await user.populate('playlists').execPopulate();

  let playlists = user.playlists;
  playlists = playlists.filter((playlist) => playlist.name === name);

  if (playlists.length > 0) {
    res.status(400).send({ error: 'Playlist already exists' });
  } else {
    const playlist = new Playlist({
      name,
    });
    await playlist.save();

    user.playlists.push(playlist.id);
    await user.save();

    res.status(201).send(playlist);
  }
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

router.delete('/:id', authMiddleware, async (req, res) => {
  const user = req.user;
  const id = req.params.id;
  if (user.playlists.includes(id)) {
    await Playlist.findByIdAndDelete(id);
    user.playlists = user.playlists.filter((playlist) => playlist.toString() !== id);
    await user.save();
    res.send({});
  } else {
    res.status(404).send({ error: `${id} could not be found` });
  }
});

router.patch('/:id', authMiddleware, async (req, res) => {
  const user = req.user;
  const id = req.params.id;
  if (user.playlists.includes(id)) {
    const playlist = await Playlist.findById(id);
    const songId = req.body.id;
    playlist.songs = playlist.songs.filter((song) => song !== songId);
    await playlist.save();
    res.send(playlist);
  } else {
    res.status(404).send({ error: `${id} could not be found` });
  }
});

module.exports = router;
