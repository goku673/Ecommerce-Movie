const {Router} = require('express');
const movieRouter = require('./moviesRouter');
const userRouter = require('./userRouter');
const errorHandler = require('../middleware/errorHandler');

const mainRouter = Router();

mainRouter.use('/movies',movieRouter);
mainRouter.use('/user',userRouter);
mainRouter.use(errorHandler);

module.exports =  mainRouter;