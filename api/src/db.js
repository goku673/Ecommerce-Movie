const { Sequelize } = require('sequelize');
const movieModel = require('./model/movies');
const userModel  = require('./model/user');

require('dotenv').config();
const { DB_URI } = process.env;

const sequelize = new Sequelize(DB_URI, {
    dialect: 'mysql',
});

sequelize.authenticate()
    .then(() => {
        console.log('Conexión exitosa a la base de datos MySQL!');
    })
    .catch(err => {
        console.error('Error de conexión: ', err.stack);
    });

// Definir el modelo
const Movie = movieModel(sequelize);
const User  = userModel(sequelize);

// Sincronizar el modelo con la base de datos (opcional, pero útil para crear tablas)
sequelize.sync()
    .then(() => {
        console.log('Modelo sincronizado con la base de datos.');
    })
    .catch(err => {
        console.error('Error al sincronizar el modelo: ', err);
    });

module.exports = {
    Movie,
    User,
    conn: sequelize,
};