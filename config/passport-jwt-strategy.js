const passport  = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

const User = require('../models/user');

let opts = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'codeial'
}

passport.use(new JWTStrategy(opts, function(jwtPayLoad, done){
    console.log(jwtPayLoad);
    User.findById(JSON.parse(jwtPayLoad.data)._id, function(err, user){
        if(err){
            console.log('Error in finding the user from jwt strategy');
            return;
        }

        if(user){
            return done(null, user);
        }else{
            return done(null, false);
        }
    })
}));

module.exports = passport;