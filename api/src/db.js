const  {Sequelize} = require('sequelize');
const movieModel =  require('./model/movies');

require('dotenv').config();
const { DB_URI } = process.env;



const sequelize = new Sequelize(DB_URI,{
   dialect : 'mysql',
});

sequelize.authenticate()
 .then(() => {
   console.log('Conexión exitosa a la base de datos MySQL!');
 })
 .catch(err => {
   console.error('Error de conexión: ', err.stack);
 });

module.exports = {
      ...sequelize.models,
      conn : sequelize,
}

