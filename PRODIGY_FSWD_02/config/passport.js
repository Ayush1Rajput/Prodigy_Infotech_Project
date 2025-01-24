const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');

module.exports = function(passport) {
    passport.use(new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
        const userEmail = await User.findOne({ email });
        if (!userEmail) return done(null, false, { message: 'No user found' });
        const isMatch = await userEmail.comparePassword(password);
        if (isMatch) return done(null, userEmail);
        return done(null, false, { message: 'Incorrect password' });
    }));

    passport.serializeUser ((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser (async (id, done) => {
        const user = await User.findById(id);
        done(null, user);
    });
};