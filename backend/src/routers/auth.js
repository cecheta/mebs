const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user');

const router = express.Router();

const BCRYPT_ROUNDS = 12;

router.post('/api/auth/register', async (req, res) => {
  try {
    const password = req.body.password;
    const hash = await bcrypt.hash(password, BCRYPT_ROUNDS);
    const user = new User({
      username: req.body.username,
      email: req.body.email,
      hash,
    });
    await user.save();
    const { jwtToken, refreshToken } = await user.generateTokens();
    const cookieOptions = {
      httpOnly: true,
      signed: true,
    };
    res.cookie('refresh', refreshToken, cookieOptions);

    res.status(201).send({
      user,
      jwt: jwtToken,
    });
  } catch (err) {
    res.send({ error: err.message });
  }
});

router.post('/api/auth/login', async (req, res) => {
  try {
    const user = await User.findByCredentials(req.body.username, req.body.password);
    const { jwtToken, refreshToken } = await user.generateTokens();
    const cookieOptions = {
      httpOnly: true,
      signed: true,
    };

    res.cookie('refresh', refreshToken, cookieOptions);
    res.send({
      user,
      jwt: jwtToken,
    });
  } catch (err) {
    res.send({ error: err.message });
  }
});

router.post('/api/auth/refresh', async (req, res) => {
  try {
    const refresh = req.signedCookies.refresh;

    if (refresh === undefined) {
      throw new Error('Refresh token missing');
    }

    const user = await User.findOne({ 'tokens.token': refresh });
    if (!user || refresh === false) {
      throw new Error('Invalid refresh token');
    }
    const jwtToken = user.generateJwtToken();

    res.send({ jwt: jwtToken });
  } catch (err) {
    res.send({ error: err.message });
  }
});

// TESTING
router.delete('/api/auth/delete', async (req, res) => {
  await User.deleteMany({});
  res.send('OK');
});

module.exports = router;
