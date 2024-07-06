const mongoose = require("mongoose")

const commentSchema = new mongoose.Schema({
    text: {
        type: String,
        required: [true,"Comment Content Missing!"]
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: [true,"Author Missing!"]
    },
},{timestamps:true});

module.exports = mongoose.model("comments", commentSchema)