const express = require('express');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const axios = require('./axios/axios-spotify');
const searchRouter = require('./routers/search');
const authRouter = require('./routers/auth');
const favouritesRouter = require('./routers/favourites');
const authMiddleware = require('./middleware/auth');

if (process.env.NODE_ENV !== 'PRODUCTION') {
  require('dotenv').config();
}
const PORT = process.env.PORT;

const app = express();

require('./config/database');

require('./config/passport')(passport);
app.use(passport.initialize());

app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));

app.use(searchRouter);
app.use(authRouter);
app.use(favouritesRouter);

app.get('/api/account', authMiddleware, async (req, res) => {
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
