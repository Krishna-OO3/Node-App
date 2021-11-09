const {sign , verify} = require("jsonwebtoken");

const createTokens = (user) =>{
    const accessToken = sign(
        {username: user.username, id: user.id}, "jwtsecretplschange"
        );
    return accessToken;
};

const validateTokens = (req,res,next) =>{
    const accessToken = req.cookies["access-token"];
    if (!accessToken){
        return res.status(400).json({message: "User not authenticated"});
    }
    try {
        const validToken = verify(accessToken, "jwtsecretplschange");
        if (validToken){
            req.authenticated = true;
            return next();
        }
    }catch (err){
        return res.status(400).json({message: "error:err"});
    }
};

module.exports = { createTokens, validateTokens };