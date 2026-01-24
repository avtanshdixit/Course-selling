const { Router }= require("express");
const adminRouter = Router();
const {adminModel}= require("../db");
const {courseModel}=require("../db");
const { z }=require("zod");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// const JWT_SECRET="admin@123"
const {jwtadmin_Secret}= require("../config");
const {adminMiddleware}= require("../middlewares/admin")



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
        },jwtadmin_Secret);

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


adminRouter.post("/course", adminMiddleware,async function(req,res){
    const adminId= req.userId;

    const{title,description,imageUrl,price}=req.body;

   const course= await courseModel.create({
         title:title,
         description:description,
         imageUrl:imageUrl,
         price:price,
         creatorId:adminId
    })

    res.json({
        msg:"course is created",
        courseId: course._id
    })
})

adminRouter.put("/course",adminMiddleware, async function(req,res){
    const adminId= req.userId;

    const{title,description,imageUrl,price,courseId}=req.body;

    //pehle course dhundha findone se , agar exist krta hai to updateone use kra phir-->ek tarika
    // const course = await courseModel.findOne({
    //     _id:courseId,
    //     creatorId:adminId
    // })
    // if(!course)
    // {
    //     res.json({msg:this "course of this admin does not exist"})
    // }

    const course= await courseModel.updateOne({
        //dusra tarika ki directy updateone me bhi filters de skte hai
        //update one uses filters like conditions ki konsa data krna hai update
        //to vo data krna hai jiski courseid ye ho aur creatorid ye ho
          _id:courseId,
          creatorId:adminId
    },{
         title:title,
         description:description,
         imageUrl:imageUrl,
         price:price,
         //creatorId:adminId  //ye to change nhi krenge
    })

    res.json({
        msg:"course is updated",
        courseId: course._id
    })

})

adminRouter.get("/course/bulk",adminMiddleware, async function(req,res){
    const adminId= req.userId;

   const courses= await courseModel.find({
         creatorId:adminId
    })

    if(courses)
    {
        res.json({
        courses
    })
    }
    else{
        res.json({msg:"no courses of this admin"})
    }
    

})

module.exports={
    adminRouter
}

