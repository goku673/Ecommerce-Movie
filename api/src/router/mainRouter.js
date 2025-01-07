const {Router} = require('express');
const movieRouter = require('./moviesRouter');
const userRouter = require('./userRouter');
const errorHandler = require('../middleware/errorHandler');
const reseniaRouter = require('./reseniaRouter')

const mainRouter = Router();

mainRouter.use('/movies',movieRouter);
mainRouter.use('/user',userRouter);
mainRouter.use('/resenias',reseniaRouter);
mainRouter.use(errorHandler);

module.exports =  mainRouter;