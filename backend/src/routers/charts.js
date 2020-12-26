const express = require('express');
const axios = require('../axios/axios-spotify');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    let response = await axios.get('/v1/search?q=top%20hits&type=playlist&limit=1');
    const playlistId = response.data.playlists.items[0].id;

    response = await axios.get(`/v1/playlists/${playlistId}/tracks`);
    const tracks = response.data.items;

    const artists = tracks
      .map((track) => track.track.artists)
      .flat()
      .map((artist) => artist.name);

    const albums = tracks.map((track) => track.track.album.name);
    const songs = tracks.map((track) => track.track.name);

    res.send({
      artists,
      albums,
      songs,
    });
  } catch (error) {
    res.status(error.response.status).send({ error: { message: error.message } });
  }
});

module.exports = router;
