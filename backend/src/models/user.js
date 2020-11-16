const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

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

userSchema.methods.generateJwtToken = function () {
  const user = this;

  const payload = {
    _id: user.id,
  };
  const options = {
    expiresIn: JWT_EXPIRES_IN,
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET, options);

  return token;
};

userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();

  delete userObject.hash;
  delete userObject.tokens;
  delete userObject.__v;

  return userObject;
};

module.exports = mongoose.model('User', userSchema);
