const { Router} = require('express');
const user = require('../model/user');
const { postUser, getUser } = require("../handlers/handlerUser");

const userRouter = Router();

userRouter.post('/signUp',postUser);
userRouter.get('/signIn',getUser);

module.exports = userRouter;