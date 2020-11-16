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
    const jwt = user.generateJwtToken();
    const refreshToken = user.generateRefreshToken();
    const cookieOptions = {
      httpOnly: true,
      signed: true,
    }
    res.cookie('refresh', refreshToken, cookieOptions);

    res.status(201).send({
      user,
      jwt,
    });
  } catch (err) {
    res.send({ error: err.message });
  }
});

module.exports = router;
