const asyncErrorHandler = require("../middleware/asyncErrors");
const PostModel = require("../database/models/postModel");
const CommentModel = require("../database/models/commentModel");

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
        res.status(200).json({message:"updated", status:true}) 
});

module.exports = {createComment};