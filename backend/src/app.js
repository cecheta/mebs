const express = require('express');
const axios = require('./axios-spotify');

if (process.env.NODE_ENV !== 'PRODUCTION') {
  require('dotenv').config();
}

const app = express();

const PORT = process.env.PORT;

app.get('/api/search', async (req, res) => {
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

app.get('/api/albums/:id', async (req, res) => {
  try {
    const response = await axios.get(`/v1/albums/${req.params.id}`);
    res.send(response.data);
  } catch (error) {
    res.status(error.response.status).send({ error: { message: error.message } });
  }
});

app.get('/api/albums', async (req, res) => {
  try {
    const response = await axios.get(`/v1/albums?ids=${req.query.ids}`);
    res.send(response.data);
  } catch (error) {
    res.status(error.response.status).send({ error: { message: error.message } });
  }
});

app.get('/api/artists/:id', async (req, res) => {
  try {
    const response = (await axios.get(`/v1/artists/${req.params.id}`)).data;
    response.albums = (await axios.get(`/v1/artists/${req.params.id}/albums`)).data.items;
    response.tracks = (await axios.get(`/v1/artists/${req.params.id}/top-tracks?country=GB`)).data.tracks;
    res.send(response);
  } catch (error) {
    res.status(error.response.status).send({ error: { message: error.message } });
  }
});

app.get('/api/artists', async (req, res) => {
  try {
    const response = await axios.get(`/v1/artists?ids=${req.query.ids}`);
    res.send(response.data);
  } catch (error) {
    res.status(error.response.status).send({ error: { message: error.message } });
  }
});

app.get('/api/account', async (req, res) => {
  try {
    const response = {
      artists: [],
      albums: [],
    };

    const artistRequest = req.query.artists ? axios.get(`/v1/artists?ids=${req.query.artists}`) : null;
    const albumRequest = req.query.albums ? axios.get(`/v1/albums?ids=${req.query.albums}`) : null;
    const requests = [artistRequest, albumRequest];

    [artistResponse, albumResponse] = await Promise.all(requests);

    if (artistResponse) {
      response.artists = artistResponse.data.artists;
    }
    if (albumResponse) {
      response.albums = albumResponse.data.albums;
    }

    res.send(response);
  } catch (error) {
    res.status(error.response.status).send({ error: { message: error.message } });
  }
});

app.get('*', (req, res) => {
  res.send('Server is up');
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
