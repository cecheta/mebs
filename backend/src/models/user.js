const crypto = require('crypto');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const JWT_EXPIRES_IN = '30m';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  hash: {
    type: String,
    required: true,
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

userSchema.statics.findByCredentials = async (username, password) => {
  const user = await User.findOne({ username });

  if (!user) {
    throw new Error('Unable to login');
  }

  const isMatch = await bcrypt.compare(password, user.hash);
  if (!isMatch) {
    throw new Error('Unable to login');
  }

  return user;
};

const generateJwtToken = function () {
  const user = this;

  const payload = {
    _id: user.id,
  };
  const options = {
    expiresIn: JWT_EXPIRES_IN,
  };

  const jwtToken = jwt.sign(payload, process.env.JWT_SECRET, options);

  return jwtToken;
};

userSchema.methods.generateJwtToken = function () {
  return generateJwtToken.bind(this)();
};

userSchema.methods.generateTokens = async function () {
  const user = this;

  const jwtToken = generateJwtToken.bind(user)();

  const refreshToken = crypto.randomBytes(200).toString('hex');
  user.tokens.push({ token: refreshToken });
  await user.save();

  return {
    jwtToken,
    refreshToken,
  };
};

userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();

  delete userObject.hash;
  delete userObject.tokens;
  delete userObject.__v;

  return userObject;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
