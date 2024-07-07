const jwt = require("jsonwebtoken");
const asyncErrorHandler = require("./asyncErrors");
const ErrorHandler = require("../utils/errorHandler");
const UserModel = require("../database/models/userModel");

//checks if user is logged in or not
const isAuthenticatedUser = asyncErrorHandler(async (req,res,next)=>{

const {user:token} = req.cookies;

if(token === 'j:null' || token === "" || !token){
    return next(new ErrorHandler("Please Login to continue",401));
}

const decodedData = jwt.verify(token,process.env.JWT_SECRET);

//saving the user in req to be accessed in the API request processing.
req.user = await UserModel.findById(decodedData.id);

next();

});

//checks if user is logged in or not. It is used on routes when only logged out user is allowed.
const isUserLoggedin = asyncErrorHandler(async(req,res,next)=>{
    if (req.cookies && req.cookies.user) {
        token = req.cookies.user
        const decodedData = await jwt.verify(token, process.env.JWT_SECRET,)
            const user = await UserModel.findOne({ _id: decodedData.id })
            if (!user) {
                return next(new ErrorHandler("Unauthorized",401))
            }
            return res.redirect('/')
    } else {
        next()
    }
})

module.exports = {isAuthenticatedUser,isUserLoggedin}