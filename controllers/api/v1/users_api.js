const User = require('../../../models/user');
const jwt = require('jsonwebtoken');


module.exports.createSession = async function(req, res){
    try{
        let user = await User.findOne({email: req.body.email});
        if(!user || user.password != req.body.password){
            return res.status(422).json({
                message: "Invalid username or password",
            })
        }

        return res.status(200).json({
            message: "Sign in successfull, Here is your key to autheticate",
            data: {
                token: jwt.sign({
                    data: JSON.stringify(user)
                }, 'codeial', { expiresIn: 1000 * 60 * 60})
            }
        })
    }catch(err){
        console.log(err);
        return res.status(500).json({
            message: "Internal server error",
        })
    }
}
