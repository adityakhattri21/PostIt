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
    },
    avatar:{
        type:String,
        default: function(){
            return `https://api.multiavatar.com/${this.username}.png`
        }
    }
});

userSchema.pre('save',async function(next){
    if(!this.isModified("password")) next();

    const salt = await bcrypt.genSalt(10);

    this.password = await bcrypt.hash(this.password,salt)
})

module.exports = mongoose.model("users",userSchema);