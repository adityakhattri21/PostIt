const mongoose = require("mongoose")

const post = new mongoose.Schema({
    content:{
        type:String,
        required:[true,"Content is Missing!"],
    },
    author: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'users' ,
        required:[true,"Author is Missing!"]
    },
    comments:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'comments'
        }
    ]
},{timestamps:true})

module.exports = mongoose.model("posts", post)