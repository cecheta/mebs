const express = require('express');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const searchRouter = require('./routers/search');
const accountRouter = require('./routers/account');
const authRouter = require('./routers/auth');
const favouritesRouter = require('./routers/favourites');

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

const apiRouter = express.Router();
app.use('/api', apiRouter);

apiRouter.use(searchRouter);
apiRouter.use(accountRouter);
apiRouter.use('/auth', authRouter);
apiRouter.use('/favourites', favouritesRouter);

app.get('*', (req, res) => {
  res.send('Server is up');
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
