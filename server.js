const express = require("express");
require('dotenv').config();
require("./database/connect");
const cookieParser = require("cookie-parser");
const errorMiddleware = require("./middleware/errorMiddleware");
const authRouter = require("./routes/authRouter");
const postRouter = require("./routes/postRouter");
const commentRouter = require("./routes/commentRouter");
const authMiddleware = require("./middleware/authMiddleware");


const app = express();
const port = process.env.PORT || 3000;

app.use(express.json())
app.use(cookieParser())

app.use('/', express.static("public/home"))
app.use('/login',authMiddleware.isUserLoggedin, express.static("public/login"))
app.use("/signup",authMiddleware.isUserLoggedin,express.static("public/signup")) 

app.use("/auth",authRouter)
app.use("/post",postRouter)
app.use("/comment",commentRouter)

app.get("/ping",(req,res)=>{
    res.status(200).json({message:"pong"})
})

app.use(errorMiddleware)

app.listen(port,()=>{
    console.log(`Server is listening at port ${port}`);
})