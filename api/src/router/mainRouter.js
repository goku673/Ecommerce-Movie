// en aqui van a venir todas mis sub rutas 
const {Router} = require('express');
const movieRouter = require('./moviesRouter');


const mainRouter = Router();

mainRouter.use('/movies',movieRouter)

module.exports =  mainRouter;