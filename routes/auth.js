const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");
const router = express.Router();

router.post("/signup", async(req,res)=>{
    const {name, email, password} = req.body;

    //checking if user with the same password exist in db
    const emailExist = await User.findOne({email});
    if(emailExist){
        return res.status(422).json({error:"user already exists with that email"});
    };

    //hashing the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password,salt);

    //saving the user information in db
    const user = new User({
        name,
        email,
        password:hashedPassword,
    });
    try {
        await user.save();
        res.status(200).json({message:"user credential saved succesfully"});
    } catch (error) {
        res.status(400).json({error:error});
    }    
    console.log(req.body);
});

router.post("/login", async (req,res)=>{
    const user = await User.findOne({email:req.body.email});
    if(!user){
        return res.json({"error":"Email does not exist"});
    };
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) {
        return res.status(401).json({"error":"password is wrong" });
    };
    //create and assign token
    try {
        const {_id,name,email} = user;
        const token = jwt.sign({_id: user._id}, process.env.SecretToken);
        res.status(200).json({token, user:{_id,name,email}});
    } catch (error) {
        res.status(422).json({error});
    }
});

module.exports = router;
