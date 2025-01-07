const { Sequelize } = require('sequelize');

const userModel = require('./model/user');
const favorites_moviesModel = require("./model/favoritesMovies");
const reseniasModel = require('./model/resenias');


require('dotenv').config();
const { DB_URI } = process.env;

const sequelize = new Sequelize(DB_URI, {
    dialect: 'mysql',
    // pool: {
    //     max: 10,       // Número máximo de conexiones en el pool
    //     min: 0,       // Número mínimo de conexiones en el pool
    //     acquire: 30000, // Tiempo máximo en milisegundos para esperar por una conexión
    //     idle: 10000    // Tiempo máximo en milisegundos para mantener una conexión inactiva antes de ser liberada
    // }
});

sequelize.authenticate()
    .then(() => {
        console.log('Conexión exitosa a la base de datos MySQL!');
    })
    .catch(err => {
        console.error('Error de conexión: ', err.stack);
    });


const User = userModel(sequelize);
const Favorite = favorites_moviesModel(sequelize);
const Resenias = reseniasModel(sequelize);


// Definición de asociaciones
User.hasMany(Favorite, {
    foreignKey: "user_id", // Clave foránea en el modelo Favorite
    sourceKey: "id" // Clave primaria en el modelo User
});

Favorite.belongsTo(User, {
    foreignKey: "user_id", // Clave foránea en el modelo Favorite
    targetKey: "id" // Clave primaria en el modelo User
});


User.hasMany(Resenias,{
    foreignKey: "user_id",
    sourceKey: "id"
});

Resenias.belongsTo(User,{
    foreignKey: "user_id",
    targetKey: "id"
})

// Sincronizar el modelo con la base de datos (opcional, pero útil para crear tablas)
sequelize.sync()
    .then(() => {
        console.log('Modelo sincronizado con la base de datos.');
    })
    .catch(err => {
        console.error('Error al sincronizar el modelo: ', err);
    });

module.exports = {
    User,
    Resenias,
    Favorite,
    conn: sequelize,
};