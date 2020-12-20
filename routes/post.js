const router = require("express").Router();
const User = require("../models/User");
const verify = require("./verifyTokens");

router.get("/", verify, (req,res)=>{
    res.json({
        post:{
            title:"my post 1",
            description:"this is private"
        }
    })
})
module.exports = router;