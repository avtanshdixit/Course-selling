const { Router }= require("express");
const adminRouter = Router();
const adminModel= require("../db");

adminRouter.post("/signup", function(req,res){
        
    res.json({
        msg:"adminlogin"
    })

})

adminRouter.post("/signup", function(req,res){

})

adminRouter.post("/createcourse", function(req,res){

})

adminRouter.put("/course", function(req,res){

})

adminRouter.get("/addcourse", function(req,res){

})

module.exports={
    adminRouter
}

