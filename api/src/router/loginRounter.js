const {Router} = require('express');
const googleLogin = require('../handlers/handlerLogin');
const logRouter = Router();

logRouter.get('/',googleLogin);

module.exports =logRouter;
