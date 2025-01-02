const { DataTypes } = require("sequelize"); // Importar DataTypes correctamente

module.exports = (sequelize) => {
    return sequelize.define("user", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true, // Corrección aquí
            autoIncrement: true,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING(100),
            allowNull: true,
        },
        image_profile: {
            type: DataTypes.STRING(100),
            allowNull: true,
        },
        email: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING(100),
            allowNull: false,
        }
    }, {
        freezeTableName: true, // Opcional: para que el nombre de la tabla sea "user"
        timestamps: false // Opcional: si no necesitas createdAt y updatedAt
    });
};