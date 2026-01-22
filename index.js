const express = require("express");
const app = express();

const { userRouter } = require("./router/user");
const { courseRouter }= require("./router/course");
const { adminRouter }= require("./router/admin");

app.use("/api/v1/user", userRouter);
app.use("/api/v1/course",courseRouter);
app.use("/api/v1/admin",adminRouter);

app.listen(3000);