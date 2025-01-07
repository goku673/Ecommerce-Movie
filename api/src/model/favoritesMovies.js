const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    return sequelize.define("Favorite", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false,
            unique: true,
        },
        image_url: {
            type: DataTypes.STRING(300),
            allowNull: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        score: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        episodes: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        year: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        trailer_url: {
            type: DataTypes.STRING(300),
            allowNull: true,
        },
        id_movie: {
            type: DataTypes.INTEGER,
            allowNull: false, // Es importante que no sea null
        },
        genre : DataTypes.STRING(100),
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            // references: {
            //     model: "user",
            //     key: "id",
            // },
        },
    });
};
