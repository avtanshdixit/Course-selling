const express = require("express");
const app = express();
const mongoose= require("mongoose");

const { userRouter } = require("./router/user");
const { courseRouter }= require("./router/course");
const { adminRouter }= require("./router/admin");

app.use("/api/v1/user", userRouter);
app.use("/api/v1/course",courseRouter);
app.use("/api/v1/admin",adminRouter);

async function main()
{
   await mongoose.connect("mongodb+srv://avtanshdi_db_user:VT4DVHuhjVvG0k95@cluster0.dvg4omi.mongodb.net/courseera-app");
   app.listen(3000);
}
main();
