'use strict';
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user').User;
const config = require('../config');

function initPassport (passport) {
    const opts = {
        jwtFromRequest: ExtractJwt.fromAuthHeader(),
        secretOrKey: config.get('token:secret')
    };
    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
        User.findOne({id: jwt_payload.id})
        .then( user => done(null, user ? user : false))
        .catch(err => done(err, false));
    }));
}

module.exports = initPassport;