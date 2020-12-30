const nodeMailer = require('../config/nodemailer');

module.exports.newComment = function(comment){
    
    nodeMailer.sendMail({
        from: "alpesh200720@gmail.com",
        to: comment.user.email,
        subject: "New Comment",
        text: "someone has commented on your post"
    }, function(err, info) {
        if(err){
            console.log("Error in sending the email", err);
            return;
        }
        console.log("Message sent", info);
        return;
    })
}