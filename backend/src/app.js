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
    res.send(response.data);
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
