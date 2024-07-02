const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[true,'Username missing!']
    },
    password:{
        type:String,
        required:[true,'Password missing!']
    }
});

userSchema.pre('save',async(next)=>{
    if(!this.isModified("password")) next();

    this.password = await bcrypt.hash(this.password,10)
})

module.exports = mongoose.model("user",userSchema);