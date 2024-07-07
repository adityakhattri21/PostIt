const UserModel = require("../database/models/userModel");
const jwt = require('jsonwebtoken');
const ErrorHandler = require("../utils/errorHandler");
const asyncErrorHandler = require("../middleware/asyncErrors");
const bcrypt = require("bcryptjs");


const signupUser = asyncErrorHandler(async (req,res,next)=>{
    const {username , password , email} = req.body;

    const existingUser = await UserModel.findOne({username});
    
    if(existingUser) return next(new ErrorHandler("Username exists",409))

    //regex to check for email and strong password.
    const emailRegex = /^[a-zA-Z0-9_%+-]+@[a-zA-z0-9-]+\.[A-Za-z]{2,}/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*?&])[A-Za-z0-9@$!%*?&]{8,}$/

    if(!emailRegex.test(email)){
        return next(new ErrorHandler("Invalid Email entered",400));
    }
    if(!passwordRegex.test(password)){
        return next(new ErrorHandler("Please Enter a Strong password containing 1 digit , 1 uppercase , 1 lowercase & 1 special character and should be 8 characters long",400));
    }
    const newUser = await UserModel.create({username,password,email})

    const authToken = jwt.sign({id:newUser._id.toString()},process.env.JWT_SECRET);
    
        res.status(200)
        .cookie("user", authToken, { httpOnly: true, secure: true, sameSite: "Strict", maxAge: 3600000, path: "/" })
        .json({ message: "Created", status: true })

});

const login = asyncErrorHandler(async (req, res,next) => {
        const { loginTerm, password } = req.body

        //checking in DB to find user by username or email
        const existingUser = await UserModel.findOne({ $or:[{email:loginTerm},{username:loginTerm}] })
        
        if (!existingUser) return next(new ErrorHandler("Invalid Credentials",401));
        
        const hash = existingUser.password
        
        const match = await bcrypt.compare(password, hash)
        
        if (!match) return next(new ErrorHandler("Invalid Credentials",401))
        
        const authToken = jwt.sign({id:existingUser._id.toString()}, process.env.JWT_SECRET)
        
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