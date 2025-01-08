const express = require('express');
const morgan = require('morgan');
const passport = require('passport');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mainRouter = require('./router/mainRouter');



const app = express();

app.name = 'API';

// Middleware
app.use(passport.initialize());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(cookieParser());

// CORS
app.use(cors({
  origin: ['https://movie-amine.onrender.com', 'http://localhost:5173','https://movie-amine.onrender.com/main'],
  credentials: true,
}));
// Headers
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin","https://movie-amine.onrender.com","http://localhost:4173","https://movie-amine.onrender.com/main");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  
  next();
});

// Routes


app.use(mainRouter);

module.exports = app;
