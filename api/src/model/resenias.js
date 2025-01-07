const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define("resenias", {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
            unique: true,
        },
        comentario: {
            type: DataTypes.STRING(400),
            allowNull: false,
        },
        date: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
    }, {
        timestamps: false, // Desactiva los timestamps
    });
}