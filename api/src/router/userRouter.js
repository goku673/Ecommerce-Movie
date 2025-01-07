const { Router} = require('express');
const user = require('../model/user');
const { postUser, getUser, getAllUsers } = require("../handlers/handlerUser");

const userRouter = Router();

userRouter.post('/signUp',postUser);
userRouter.post('/signIn',getUser);
//quitarlo despues 
userRouter.get('/',getAllUsers);
module.exports = userRouter;