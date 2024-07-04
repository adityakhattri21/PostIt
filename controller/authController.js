const UserModel = require("../database/models/userModel");
const jwt = require('jsonwebtoken');


const signupUser = async (req,res,next)=>{
    const {username , password} = req.body;
    const existingUser = await UserModel.findOne({username});
    
    if(existingUser) return  res.status(400).json({status:false , message:'Username in use please select something else'});

    const newUser = await UserModel.create({username,password})

    const authToken = jwt.sign({id:newUser._id.toString()},process.env.JWT_SECRET);
    
        res.status(200).cookie("user", authToken, { httpOnly: true, secure: true, sameSite: "Strict", maxAge: 3600000, path: "/" })
        .json({ message: "Created", status: true })

}

const login = async (req, res) => {
        const { username, password } = req.body
        const existingUser = await UserModel.findOne({ username })
        if (!existingUser) return res.status(401).json({ message: "User doesn't exists", status: false })
        const hash = existingUser.password
        const match = await bcrypt.compare(password, hash)
        if (!match) return res.status(401).json({ message: "Wrong Credentials", status: false })
        const authToken = jwt.sign(existingUser._id.toString(), process.env.JWT_SECRET)
        res.cookie("user", authToken, { httpOnly: true, secure: true, sameSite: "Strict", maxAge: 3600000, path: "/" })
        res.status(200).json({ message: "Logged In", status: true })
}

const logout = async (req,res,next)=>{
    res.status(200).cookie("user", "", { httpOnly: true, secure: true, sameSite: "Strict", path: "/" })
    .json({ message: "Logged Out", status: true })
}

const getDetails = async (req, res) => {

        const user = await UserModel.findOne({ _id: req.id })
        res.status(200).json({ user, status: true })
}

module.exports ={
    signupUser,
    logout,
    login,
    getDetails
}