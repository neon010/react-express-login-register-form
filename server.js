const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(cors());
app.use(express.json());

//for env file
require('dotenv').config();
const port = process.env.PORT || 5000;


//connecting to db
const uri = process.env.Mongo_Uri;

mongoose.connect(uri, {useNewUrlParser: true,
                    useUnifiedTopology: true,
                    useCreateIndex: true}, (error)=>{
    if(error){
        console.log(`connection unsuccesful error: ${error}`)
    }else{
        console.log(`connection established successfully ${mongoose.connection.host}`);
    };
});

//Import Routes
const authRouter = require("./routes/auth");
const postRouter = require("./routes/post");


//Routes middlewares
app.use("/api/auth/user", authRouter);
app.use("/api/post", postRouter);

app.listen(port, ()=>{
    console.log(`server is running at ${port}`);
})