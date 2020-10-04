const express = require('express');
const axios = require('./axios-spotify');

if (process.env.NODE_ENV !== 'PRODUCTION') {
  require('dotenv').config();
}

const app = express();

const PORT = process.env.PORT || 4000;

app.get('/api/search', (req, res) => {
  const query = req.query;
  const config = { params: query };
  axios
    .get('/v1/search', config)
    .then((response) => res.send(response.data))
    .catch((error) => {
      res.status(error.response.status).send({
        error: { message: error.message },
      });
    });
});

app.get('*', (req, res) => {
  res.send('Server is up');
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
