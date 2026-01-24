const { Router }= require("express");
const courseRouter = Router();
const {courseModel,purchaseModel}= require("../db")
const {userMiddleware}=require("../middlewares/user");


courseRouter.get("/purchase", userMiddleware,async function(req,res){
      const userId = req.userId;
      const courseId= req.body.courseId;

      //ideally should check whether payment is made or not
      const purchase = await purchaseModel.create({
         userId,
         courseId
      })
      
      res.json({
        msg: "you have purchase the course"
      })
})

courseRouter.get("/preview", async function(req,res){
  const courses = await courseModel.find({});

  res.json({
    courses
  })

})

module.exports={
    courseRouter
}
