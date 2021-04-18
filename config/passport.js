const { Strategy, ExtractJwt } = require('passport-jwt');
const passport = require('passport');
const User = require('../models/user');

let opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_SECRET;

passport.use(new Strategy(opts, function(jwt_payload, done) {
    console.log('A');
    const { sub } = jwt_payload;
    User.findOne({ _id: sub }, function(err, user) {
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    });
}));