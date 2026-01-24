const jwt=require("jsonwebtoken");
const {jwtadmin_Secret}=require("../config");

function adminMiddleware(req,res,next)
{
    const token = req.headers.token;
    const decoded = jwt.verify(token,jwtadmin_Secret)

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
    adminMiddleware
}