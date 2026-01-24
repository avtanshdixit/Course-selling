const jwt=require("jsonwebtoken");
const {jwtuser_Secret}=require("../config");

function userMiddleware(req,res,next)
{
    const token = req.headers.token;
    const decoded = jwt.verify(token,jwtuser_Secret)

    if(decoded)
    {
        req.userId =decoded.id;
        next();     
    }
    else{
        res.status(403).json({
            msg: "you are not signed in"
        })
    }

}

module.exports={
    userMiddleware
}