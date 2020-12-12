const User = require('../models/user');

module.exports.profile = function(req, res){
                return res.render('user_profile',{
                    pageTitle: "Codeial | USer Profile",
                });
            
    
}


// Render the sign up page
module.exports.signUp = (req, res) => {
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_up',{
        pageTitle: "Codeial | Sign Up"
    });
}

// Render the sign in page
module.exports.signIn = (req, res) => {
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_in',{
        pageTitle: "Codeial | Sign In"
    });
}

//Get the sign up data
module.exports.create = function(req, res){
    //TODO List
    //Check if password and confirm password are same
      if(req.body.password != req.body.confirmPassword){
          return res.redirect('back');
      }  
    //check if email is unique
    User.findOne({email: req.body.email}, function(err, user){
        if(err){console.log("Error in finding the user while signing up"); return}
        if(!user){
            //Enter user detials in database y
            User.create(req.body, function(err, user){
                if(err){
                    console.log("Error Creating the user while signing up");
                }
                return res.redirect('/users/sign-in');
            })
        }else{
            return res.redirect('back');
        }
    })

    
}


// get the sign in data and create users-session
module.exports.createSession = function(req, res){
    return res.redirect('/');  
}