const passportJwt = require('passport-jwt');
const User = require('../models/user');

const JWTStrategy = passportJwt.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
  jsonWebTokenOptions: {
    maxAge: '7d',
  },
};

module.exports = (passport) => {
  passport.use(
    new JWTStrategy(options, async (jwt_payload, done) => {
      try {
        const user = await User.findOne({ _id: jwt_payload._id }).exec();
        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      } catch (err) {
        return done(err, false);
      }
    })
  );
};
