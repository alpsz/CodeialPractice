const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const User = require('../models/user');
const crypto = require('crypto');
const env = require('../config/environment');
//tell passport to use new strategy for google login

passport.use(new googleStrategy({
    clientID: env.google_client_id,
    clientSecret: env.google_client_secret,
    callbackURL: env.google_callback_url,
},function(accessToken, refreshToken, profile, done){
    User.findOne({email: profile.emails[0].value}).exec((err, user) => {
        if(err){
            console.log("Error in passport google strategy", err);
            return;
        }
        if(user){
            // if found set this user as req.user
            return done(null, user);
        }else{
            // if not found then create the user profile and set req.user
            User.create({
                name: profile.displayName,
                email: profile.emails[0].value,
                password: crypto.randomBytes(20).toString('hex'),
            }, function(err, user){
                if(err){
                    console.log("Error in creating the user");
                }
                return done(null, user);
            })
        }
    })
}));

module.exports = passport;