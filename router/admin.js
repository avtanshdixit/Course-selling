const { Router }= require("express");
const adminRouter = Router();
const {adminModel}= require("../db");
const { z }=require("zod");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT_SECRET="avtansh@123"



adminRouter.post("/signup", async function(req,res){
        // const email= req.body.email;
        // const password= req.body.password;
        // const firstname = req.body.firstname;
        // const lastname= req.body.lastname

        const {email,password,firstname,lastname}= req.body;

        const requiredbody=z.object({
            email:z.string(),
            password: z.string(),
            firstname:z.string(),
            lastname:z.string()
        })
         const parseddatawithsuccess=requiredbody.safeParse(req.body);

        if(!parseddatawithsuccess.success)
    {
        res.json({msg:"incorrect format",
            error:parseddatawithsuccess.error
        })
        return
    }

    let errorthrown= false;
try{
    const hashpassword= await bcrypt.hash(password,5);

   await adminModel.create({
        email:email,
        password:hashpassword,
        firstname:firstname,
        lastname:lastname
    });
}
catch (e) {

        // Duplicate email error
        if (e.code === 11000) {
            return res.status(409).json({
                msg: "Admin already exists"
            });
        }

        // Any other error
        console.error(e);
        return res.status(500).json({
            msg: "Internal server error"
        });
    }

if(!errorthrown)
{
    res.json({
        msg: "Admin signed up"
    })
}   

})

adminRouter.post("/signin", async function(req,res){
    const email=req.body.email;
    const password = req.body.password;
    
    const response = await adminModel.findOne({
        email:email,
        // password:password
    })

    if(!response)
    {
        res.status(403).json({
            msg:"admin does not exist in db"
        })
        return
    }
    const passwordmatch = await bcrypt.compare(password,response.password);

    if(passwordmatch){
        const token = jwt.sign({
            id: response._id.toString()
        },JWT_SECRET);

        res.json({
        token
         })
    }

    else {
        res.status(403).json({
            msg:"wrong credential"
        })
    }
});


adminRouter.post("/", function(req,res){

})

adminRouter.put("/", function(req,res){

})

adminRouter.get("/", function(req,res){

})

module.exports={
    adminRouter
}

