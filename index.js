const express = require("express");
const app = express();
const mongoose= require("mongoose");
//require('dotenv').config()
const {mongoUrl}=require("./config");

app.use(express.json());


const { userRouter } = require("./router/user");
const { courseRouter }= require("./router/course");
const { adminRouter }= require("./router/admin");

app.use("/api/v1/user", userRouter);
app.use("/api/v1/course",courseRouter);
app.use("/api/v1/admin",adminRouter);

async function main()
{
   //await mongoose.connect("mongodb+srv://avtanshdi_db_user:VT4DVHuhjVvG0k95@cluster0.dvg4omi.mongodb.net/courseera-app");
  await mongoose.connect(mongoUrl)
//   .then(() => console.log("MongoDB connected"))
//   .catch(err => console.error("Mongo error:", err));
     app.listen(3000);
}
main();
