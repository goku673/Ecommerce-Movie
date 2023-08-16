const express = require('express');
const morgan = require('morgan');
// para la serguridad del servidor;
const passport  = require('passport');
const cors = require('cors');
// en aqui traemos la ruta principal
const cookieParser = require('cookie-parser');
const mainRouter = require('./router/mainRouter');
const bodyParser = require('body-parser');

const app = express();

app.name = 'API';
app.use(passport.initialize());
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(morgan('dev'));
app.use(cookieParser());
//configuracion de las cors;

app.use((req,res,next) => {

    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Conten-Type, Accept"
    );

    res.header("Access-Control-Allow-Methods", "GET,POST,OPTIONS,PUT,DELETE");

    next();
});

// para detectar la estructura json;
app.use(express.json());
app.use(mainRouter);



module.exports = app;
