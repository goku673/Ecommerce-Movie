const { Sequelize } = require('sequelize');
const userModel = require('./model/user');
const favorites_moviesModel = require('./model/favoritesMovies');
const reseniasModel = require('./model/resenias');
require('dotenv').config();
const { DB_URI } = process.env;

const sequelize = new Sequelize(DB_URI, {
    dialect: 'mysql',
});

sequelize.authenticate();

const User = userModel(sequelize);
const Favorite = favorites_moviesModel(sequelize);
const Resenias = reseniasModel(sequelize);

// Definición de relaciones
User .hasMany(Favorite, { foreignKey: "user_id", sourceKey: "id" });
Favorite.belongsTo(User, { foreignKey: "user_id", targetKey: "id" });

User .hasMany(Resenias, { foreignKey: "user_id", sourceKey: "id" });
Resenias.belongsTo(User, { foreignKey: "user_id", targetKey: "id" });

module.exports = {
    conn: sequelize,
    User,
    Favorite,
    Resenias,
};