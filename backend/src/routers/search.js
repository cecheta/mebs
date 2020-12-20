const express = require('express');
const axios = require('../axios/axios-spotify');

const router = express.Router();

router.get('/search', async (req, res) => {
  const config = { params: req.query };
  try {
    const response = await axios.get('/v1/search', config);
    for (const property in response.data) {
      let complete = false;
      if (response.data[property].items.length < 20) {
        complete = true;
      }

      response.data[property] = {
        items: response.data[property].items,
        complete,
      };
    }
    res.send(response.data);
  } catch (error) {
    res.status(error.response.status).send({ error: { message: error.message } });
  }
});

router.get('/albums/:id', async (req, res) => {
  // TODO: manipulate response before returning to frontend
  try {
    const response = await axios.get(`/v1/albums/${req.params.id}`);
    res.send(response.data);
  } catch (error) {
    res.status(error.response.status).send({ error: { message: error.message } });
  }
});

router.get('/albums', async (req, res) => {
  try {
    const response = await axios.get(`/v1/albums?ids=${req.query.ids}`);
    res.send(response.data);
  } catch (error) {
    res.status(error.response.status).send({ error: { message: error.message } });
  }
});

router.get('/artists/:id', async (req, res) => {
  try {
    const requests = [axios.get(`/v1/artists/${req.params.id}`), axios.get(`/v1/artists/${req.params.id}/albums`), axios.get(`/v1/artists/${req.params.id}/top-tracks?country=GB`)];

    const [artist, albums, tracks] = await Promise.all(requests);
    res.send({
      ...artist.data,
      albums: albums.data.items,
      tracks: tracks.data.tracks,
    });
  } catch (error) {
    res.status(error.response.status).send({ error: { message: error.message } });
  }
});

router.get('/artists', async (req, res) => {
  try {
    const response = await axios.get(`/v1/artists?ids=${req.query.ids}`);
    res.send(response.data);
  } catch (error) {
    res.status(error.response.status).send({ error: { message: error.message } });
  }
});

router.get('/songs', async (req, res) => {
  try {
    const response = await axios.get(`/v1/tracks?ids=${req.query.ids}`);
    res.send(response.data.tracks);
  } catch (error) {
    res.status(error.response.status).send({ error: { message: error.message } });
  }
});

module.exports = router;
