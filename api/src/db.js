const  {Sequelize} = require('sequelize');

const movieModel =  require('./model/movies');

const sequelize = new Sequelize( `postgres://postgres:pepito123@localhost:5432/movies`);

movieModel(sequelize);

const { Movie} = sequelize.models;


module.exports = {
      ...sequelize.models,
      conn : sequelize,
}

