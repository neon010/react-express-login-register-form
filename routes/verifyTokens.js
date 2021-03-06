const jwt = require("jsonwebtoken");


function auth(req,res,next){
    const token = req.header("auth-token");
    if(!token){
        res.status(401).send("Access Denied");
    };

    try {
        const verified = jwt.verify(token, process.env.SecretToken);
        req.user = verified;
        next()
    } catch (error) {
        res.status(400).send("invalid tokens");
    }
}

module.exports = auth;