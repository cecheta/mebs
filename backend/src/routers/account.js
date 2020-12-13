const express = require('express');
const axios = require('../axios/axios-spotify');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

router.get('/account', authMiddleware, async (req, res) => {
  try {
    artists = req.user.favourites.artists;
    albums = req.user.favourites.albums;

    const artistRequest = artists.length > 0 ? axios.get(`/v1/artists?ids=${artists.join(',')}`) : null;
    const albumRequest = albums.length > 0 ? axios.get(`/v1/albums?ids=${albums.join(',')}`) : null;
    const requests = [artistRequest, albumRequest];

    const [artistResponse, albumResponse] = await Promise.all(requests);

    const response = {
      artists: [],
      albums: [],
    };
    if (artistResponse) {
      response.artists = artistResponse.data.artists;
    }
    if (albumResponse) {
      response.albums = albumResponse.data.albums;
    }

    const user = req.user;
    await user.populate('playlists').execPopulate();
    response.playlists = user.playlists;

    res.send(response);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

module.exports = router;
