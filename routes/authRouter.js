const express = require("express");
const router = express.Router();

module.exports = router.post("/signup",(req,res)=>{
     res.status(200).json({message:"This is the signup route"});
})
.post("/login",(req,res)=>{
    res.status(200).json({message:"This is the login route"});
});
