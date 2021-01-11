const router = require("express").Router();
const User = require("../models/User");
const verify = require("./verifyTokens");

router.get("/all-user", verify, async (req,res)=>{
    try {
        const allUserdetails = await User.find();
        const users = allUserdetails.map(obj => {
            return {id:obj._id, name:obj.name, email:obj.email}
        })
        res.status(200).json({users}); 
    } catch (error) {
        console.log(error);
    };
})
module.exports = router;