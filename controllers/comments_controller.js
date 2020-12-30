const Comment = require('../models/comment');
const Post = require('../models/post');
const commentsMailer = require('../mailers/comments-mailer');
module.exports.create = async function(req, res) {
    try{
        let post = await Post.findById(req.body.post);
        if(post) {
            
            let comment = await Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            });
            post.comments.push(comment);
            post.save();
            let populatedComment = await comment.populate('user', 'name email').execPopulate();
            commentsMailer.newComment(populatedComment);
            req.flash('success', 'Comment added Successfully');
            res.redirect('/');
        }
    }catch(err){
        req.flash('error', "Something went wrong!");
        console.log(err);
        return res.redirect('back');
    }
    
}

module.exports.destroy = function(req, res){
    Comment.findById(req.params.id, function(err, comment){
        if(comment.user == req.user.id){
            let postId = comment.post;

            comment.remove();

            Post.findOneAndUpdate(postId, {$pull : {comments: req.params.id}}, function(err, post){
                return res.redirect('back');
            })
        }else{
            return res.redirect('back');
        }
    })
}