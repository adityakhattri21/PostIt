const asyncErrorHandler = require("../middleware/asyncErrors");
const PostModel = require("../database/models/postModel");
const CommentModel = require("../database/models/commentModel");

/**
 * @description This function is used to add comment to the post
 * @returns Success Message
 */
const createComment = asyncErrorHandler(async(req,res)=>{
        const userId = req.user._id
        const {postId, comment} = req.body
        const newComment= await CommentModel.create({
            text:comment,
            author:userId
        })
        await PostModel.findOneAndUpdate(
            {_id:postId},
            {$push:{
                comments: newComment._id
            }}
        )
        res.status(200).json({message:"updated", success:true}) 
});

module.exports = {createComment};