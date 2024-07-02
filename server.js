const express = require("express");
require('dotenv').config();
require("./database/connect");
const authRouter = require("./routes/authRouter")


const app = express();
const port = process.env.PORT || 3000;


app.use("/auth",authRouter)

app.get("/ping",(req,res)=>{
    res.status(200).json({message:"pong"})
})

app.listen(port,()=>{
    console.log(`Server is listening at port ${port}`);
})