const passport = require('passport');
const User = require('../models/user');
const LocalStrategy = require('passport-local').Strategy;

//Authentication using passport

passport.use(new LocalStrategy({
    usernameField: 'email',
}, function (email, password, done){
    //find a user and establish the identity
    User.findOne({email: email}, function(err, user){
        // if error is thrown while executing the query
        if(err){console.log('Error in finding the user --> passport'); return done(err);}
        //if user is not found 
        if(!user){console.log('User not found'); return done(null ,false);}
        //if user's password and entered password doesn't match
        if(user.password != password){console.log('Username or password is incorrect'); return done(err, false)}
        //Everything is ok 
        return done(null, user);
    });
}));

//serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

//deserializing the user from the key in the cookies
passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        if(err){console.log('Error in finding the user --> passport'); return done(err);} 
        done(err, user);
    });
  });

  //check if the user is authenticated
  passport.checkAuthentication = function(req, res, next){
      //if the user is signed in , then pass on the request to the next function (Controller's action)
      if(req.isAuthenticated()){
          return next();
      }

      //if the user is not signed in
      return res.redirect('/users/sign-in');
  }

  passport.setAuthenticatedUser = function(req, res, next){
      if(req.isAuthenticated()){
          //req.user contains signed in user from the session and we are just sending this to the locals to use
            res.locals.user = req.user;
        }
    next();
  }

  module.exports = passport;