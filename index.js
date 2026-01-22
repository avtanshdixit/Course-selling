const express = require("express");
const app = express();

const { userRouter } = require("./router/user");
const { courseRouter }= require("./router/course");

app.use("/user", userRouter);
app.use("/course",courseRouter);

app.listen(3000);