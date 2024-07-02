const mongoose = require("mongoose");

mongoose.connect(process.env.DB_URI)
.then(()=>{
    console.log(`Connected to database`)
})
.catch((err)=>{
    console.log(`Connection to database failed.... ${err}`)
})