// en aqui van a venir todas mis sub rutas 
const {Router} = require('express');
const movieRouter = require('./moviesRouter');
const logRouter = require('./loginRounter');

const mainRouter = Router();

mainRouter.use('/logGoogle',logRouter);
mainRouter.use('/movies',movieRouter)

module.exports =  mainRouter;