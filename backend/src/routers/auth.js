const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user');

const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const password = req.body.password;
    const hash = await bcrypt.hash(password, +process.env.BCRYPT_ROUNDS);
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
    res.status(400).send({ error: err.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    let user;
    if (req.body.username) {
      user = await User.findByUsername(req.body.username, req.body.password);
    } else if (req.body.email) {
      user = await User.findByEmail(req.body.email, req.body.password);
    } else {
      throw new Error('Bad request');
    }

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
    res.status(400).send({ error: err.message });
  }
});

router.post('/refresh', async (req, res) => {
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
    res.status(400).send({ error: err.message });
  }
});

// TESTING
router.delete('/delete', async (req, res) => {
  await User.deleteMany({});
  res.send('OK');
});

module.exports = router;
