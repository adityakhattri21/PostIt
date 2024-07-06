const jwt = require("jsonwebtoken");
const asyncErrorHandler = require("./asyncErrors");
const ErrorHandler = require("../utils/errorHandler");
const UserModel = require("../database/models/userModel");

const isAuthenticatedUser = asyncErrorHandler(async (req,res,next)=>{

const {user:token} = req.cookies;

if(token === 'j:null' || token === "" || !token){
    return next(new ErrorHandler("Please Login to continue",401));
}

const decodedData = jwt.verify(token,process.env.JWT_SECRET);

req.user = await UserModel.findById(decodedData.id);

next();

});

const isUserLoggedin = asyncErrorHandler(async(req,res,next)=>{
    if (req.cookies && req.cookies.user) {
        token = req.cookies.user
        jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
            if (err) {
                console.error(err)
                return res.status(401).json({ msg: "Invalid token", status: false })
            }
            const user = await User.findOne({ _id: decoded })
            if (!user) {
                return res.status(401).json({ message: "Unathorized", success: false })
            }
            return res.redirect('/')

        })
    } else {
        next()
    }
})

module.exports = {isAuthenticatedUser,isUserLoggedin}