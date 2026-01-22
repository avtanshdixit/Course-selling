// const express = require("express")  //these 2 do same work as the line in 4th line
// const Router = express();

const { Router }= require("express");
const userRouter = Router();
const userModel= require("../db")

userRouter.post("/signup", function(req,res){

})

userRouter.post("/signup", function(req,res){

})

userRouter.get("/purchases", function(req,res){

})

module.exports = {
      userRouter
}
