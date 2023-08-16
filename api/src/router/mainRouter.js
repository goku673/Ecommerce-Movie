// en aqui van a venir todas mis sub rutas 
const {Router} = require('express');
const movieRouter = require('./moviesRouter');
const loginRouter = require('./login');
const { passportGoogle }  = require('../middlewares/google')

const mainRouter = Router();

mainRouter.use('/movies',movieRouter)
mainRouter.use('/auth',passportGoogle.authenticate('aut-google',
{
    scope : [
        "https://www.googleapis.com/auth/userinfo.porfile",
        "https://www.googleapis.com/auth/userinfo.imaili",
    ]
}
    ),loginRouter);
module.exports =  mainRouter;