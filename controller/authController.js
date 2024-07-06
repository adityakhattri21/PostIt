const UserModel = require("../database/models/userModel");
const jwt = require('jsonwebtoken');
const ErrorHandler = require("../utils/errorHandler");
const asyncErrorHandler = require("../middleware/asyncErrors");
const bcrypt = require("bcryptjs");


const signupUser = asyncErrorHandler(async (req,res,next)=>{
    const {username , password} = req.body;

    const existingUser = await UserModel.findOne({username});
    
    if(existingUser) return next(new ErrorHandler("Username exists",409))

    const newUser = await UserModel.create({username,password})

    const authToken = jwt.sign({id:newUser._id.toString()},process.env.JWT_SECRET);
    
        res.status(200)
        .cookie("user", authToken, { httpOnly: true, secure: true, sameSite: "Strict", maxAge: 3600000, path: "/" })
        .json({ message: "Created", status: true })

});

const login = asyncErrorHandler(async (req, res,next) => {
        const { username, password } = req.body

        const existingUser = await UserModel.findOne({ username })
        
        if (!existingUser) return next(new ErrorHandler("Invalid Credentials",401));
        
        const hash = existingUser.password
        
        const match = await bcrypt.compare(password, hash)
        
        if (!match) return next(new ErrorHandler("Invalid Credentials",401))
        
        const authToken = jwt.sign(existingUser._id.toString(), process.env.JWT_SECRET)
        
        res.cookie("user", authToken, { httpOnly: true, secure: true, sameSite: "Strict", maxAge: 3600000, path: "/" })
        res.status(200).json({ message: "Logged In", status: true })
})

const logout = asyncErrorHandler(async (req,res,next)=>{
    res.status(200).cookie("user", "", { httpOnly: true, secure: true, sameSite: "Strict", path: "/" })
    .json({ message: "Logged Out", status: true })
})

const getDetails = asyncErrorHandler(async (req, res) => {

        const user = await UserModel.findOne({ _id: req.user._id })
        res.status(200).json({ user, status: true })
})

module.exports ={
    signupUser,
    logout,
    login,
    getDetails
}