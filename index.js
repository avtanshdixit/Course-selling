const express = require("express");
const app = express();

const { userRouter } = require("./router/user");
const { courseRouter }= require("./router/course");
const { adminRouter }= require("./router/admin");

app.use("/user", userRouter);
app.use("/course",courseRouter);
app.use("/admin",adminRouter);

app.listen(3000);