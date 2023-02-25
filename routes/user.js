const express = require('express');
const userRouter = express.Router();
const { userlogin, usersignup } = require('../controller/user')

userRouter.post('/login', userlogin)
userRouter.post("/signup", usersignup);

module.exports = userRouter;