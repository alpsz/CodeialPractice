const Like = require('../models/like');
const Post = require('../models/post');
const Comment = require('../models/comment');


module.exports.toggleLike = async function(req, res){
    try{
        // likes/toggle/?id=vfhg2v1342&type=Post
        let likeable;
        let deleted = false;

        if(req.query.type == 'Post'){
            //populate the post in the likeable variable
            likeable = await Post.findById(req.query.id).populate('likes');
        }else{
            //populate the comment in the likeable variable
            likeable = Comment.findById(req.query.id).populate('likes');
        }
        //check if a like already exists
        let existingLike = Like.findOne({
            likeable: req.query.id,
            onModel: req.query.type,
            user: req.user._id
        });
        //console.log(existingLike._id);
        //if a like already exists then delete it
        if(existingLike){
            likeable.likes.pull(existingLike._id);
            likeable.save();
            existingLike.remove();
            deleted = true;
        }else{
            //else make a new like
            let newLike = await Like.create({
                user: req.user._id,
                likeable: req.query.id,
                onModel: req.query.type
            });

            likeable.likes.push(newLike._id);
            likeable.save();
        }
        return res.status(200).json({
            message: 'Request successful',
            deleted: deleted
        });
    }catch(err){
        console.log(err);
        return res.status(500).json({
            message: "Internal server error",
        })
    }
}
