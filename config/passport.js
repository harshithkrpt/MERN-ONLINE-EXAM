const JWTStrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;

// importing model of admin
const mongoose = require("mongoose");
const Admin = mongoose.model("admin");
// create a secret key for passport
const keys = require("../config/keys").secretKey;

const opts = {};
opts.jwtFromRequest = ExtractJWT.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys;

module.exports = passport => {
  passport.use(
    new JWTStrategy(opts, (jwt_payload, done) => {
      Admin.findById(jwt_payload.id).then(user => {
        if (user) return done(null, user);
        return done(null, false);
      });
    })
  );
};
