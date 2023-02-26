const express = require('express');
const userRouter = express.Router();
const { userlogin, usersignup } = require('../controller/user')
const asyncHandler = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);

userRouter.post('/login', asyncHandler(userlogin))
userRouter.post("/signup", asyncHandler(usersignup));

module.exports = userRouter;