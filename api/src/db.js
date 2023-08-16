const  {Sequelize} = require('sequelize');

const movieModel =  require('./model/movies');
require('dotenv').config();
const {DB,DB_PASSWORD,HOST,PORT,NAME} = process.env;

const sequelize = new Sequelize( `postgres://${DB}:${DB_PASSWORD}@${HOST}:${PORT}/${NAME}`);

movieModel(sequelize);

const { Movie} = sequelize.models;


module.exports = {
      ...sequelize.models,
      conn : sequelize,
}

