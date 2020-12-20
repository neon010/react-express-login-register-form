const router = require("express").Router();
const User = require("../models/User");
const {registerValidation, loginValidation} = require("../validations/validation");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");



router.post("/register", async (req,res)=>{
    //joi validation
    const validation = registerValidation(req.body);
    if(validation.error){
        return res.status(400).send(validation.error.details[0].message);
    }
    //checking if user with the same password already exists in db
    const emailExist = await User.findOne({email:req.body.email});
    if(emailExist){
        return res.status(400).send("email already exist");
    };

    //hashing the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
        name: req.body.name,
        email:req.body.email,
        password: hashedPassword
    });

    try {
        const savedUser = await user.save();
        res.status(200).json(savedUser);
    } catch (error) {
        res.status(400).json(error);
    }
});

router.post("/login", async (req,res)=>{
    //joi validation
    const validation = loginValidation(req.body);
    if(validation.error){
        return res.status(400).send(validation.error.details[0].message);
    };

    const user = await User.findOne({email:req.body.email});
    if(!user){
        return res.status(400).send("Email does not exist");
    };
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) {
        return res.status(400).send("password is wrong");
    };
    //create and assign token
    const token = jwt.sign({_id: user._id}, process.env.SecretToken);
    res.header("auth-token", token).send(token);
});

module.exports = router;