const asyncErrorHandler = require("../middleware/asyncErrors");
const PostModel = require("../database/models/postModel");

/**
 * @description This function is used to create the post
 * @returns Success message
 */
const createPost = asyncErrorHandler(async(req,res)=>{
    const { content } = req.body
    const userId = req.user._id;

    const payload = {
        content,
        author: userId
    }
        await PostModel.create(payload)
        res.status(201).json({ message: "Created" })
})

/**
 * @description This function is used to fetch all the posts
 * @returns All the posts in array
 */
const getAllPosts = asyncErrorHandler(async(req,res)=>{
    const posts = await PostModel.find({})
    .populate({
        path:"author",
        select:"-password"
    })
    .populate({
        path:'comments',
        populate:{
            path:"author",
            select:"-password"
        }
    })
    res.status(200).json({ status: true, results: posts.length, posts })

})

module.exports = {
    createPost , getAllPosts
}