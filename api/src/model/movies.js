const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    return sequelize.define("Movie", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true, // Asegúrate de que el ID se incremente automáticamente
            allowNull: false,
        },
        title: {
            type: DataTypes.STRING(500),
            allowNull: false,
        },
        synopsis: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        trailer: {
            type: DataTypes.STRING(1000),
            allowNull: false,
        },
        rating: {
            type: DataTypes.STRING(500),
            allowNull: false,
        },
        images: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    }, {
        freezeTableName: true, // Corrección aquí
        timestamps: false // Si no necesitas campos de timestamps (createdAt, updatedAt)
    });
};