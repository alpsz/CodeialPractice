const Post = require('../../../models/post');
const Comment = require('../../../models/comment');


module.exports.index = async function(req, res){
    try{
        //populate the user of each post
        let posts = await Post.find({})
                            .sort('-createdAt')
                            .populate('user')
                            .populate({
                                path: 'comments',
                                populate: {
                                    path: 'user'
                                }
                            });
        return res.status(200).json({
            "message" : "List of all posts",
            "posts": posts
        });
    }catch(err){
        console.log('Error', err);
        return;
    }
}


module.exports.destroy = async function(req, res){
    try{
        let post = await Post.findById(req.params.id);
        if(post.user == req.user.id){
        post.remove();
        await Comment.deleteMany({post : req.params.id});
        return res.status(200).json({
            message: "Posts and associated comments are deleted.",
        });
    }else{
        return res.status(401).json({
            message: "You cannot delete this post!",
        })
    }

    }catch(err){
        console.log('Error', err);
        return;
    }
}