const User = require('../models/user');
const fs = require('fs');
const path = require('path');

module.exports.profile = function(req, res){
    User.findById(req.params.id, function(err, user){
        return res.render('user_profile',{
            pageTitle: 'Codeial | User Profile',
            profile_user: user
        });
    });
    
}

module.exports.update = async function(req, res){
    // if(req.user.id == req.params.id){
    //     User.findByIdAndUpdate(req.params.id, req.body, function(err, user){
    //         return res.redirect('back');
    //     });
    // }else{
    //     return res.status(401).send('Unauthorized');
    // }
    try{
        let user = await User.findById(req.params.id);
        User.uploadAvatar(req, res, function(err){
            if(err){
                console.log('Multer error', err);
            }

            user.name = req.body.name;
            user.email = req.body.email;
            if(req.file){
                if(user.avatar){
                    fs.unlinkSync(path.join(__dirname,'..', user.avatar));
                }
                //this is storing the path of the uploaded file in the database
                user.avatar = User.avatarPath + '/' + req.file.filename;
            }
            user.save();
            return res.redirect('back');
        })
    }catch(err){
        console.log('Error uploading file!')
    }
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
    req.flash('success', 'logged in successfully');
    return res.redirect('/');  
}

// Action to logout the user and destroy the session
module.exports.destroySession = function(req, res){
    req.logout();
    req.flash('success', 'logged out successfully');
    return res.redirect('/');
}
