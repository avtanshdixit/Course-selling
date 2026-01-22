const { Router }= require("express");
const courseRouter = Router();
const courseModel= require("../db")


courseRouter.get("/purchase", function(req,res){
      res.json({
        msg: "see my purchased courses"
      })
})

courseRouter.get("/preview", function(req,res){

})

module.exports={
    courseRouter
}
