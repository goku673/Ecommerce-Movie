const { DataTypes } = require("sequelize");

module.exports = (Sequelize) => {
    
    Sequelize.define("Movie", {

           id  : {
             type : DataTypes.INTEGER,
                  primaryKey : true,
                  allowNull : false,
           },
           title : {
                 type : DataTypes.STRING(500),
                 allowNull : false,

           },
           synopsis :  {
                    type : DataTypes.TEXT,
                    allowNull : false,
           },
           trailer : {
                 type : DataTypes.STRING(1000),
                 allowNull :false,
           },
           rating : {
                 type : DataTypes.STRING(500),
                 allowNull :false,
           },
           images : {
                 type :DataTypes.STRING,
                 allowNull : false,
           },
           price : {
             type : DataTypes.INTEGER,
             allowNull : false,
           }


    }, {freezeTablerName : true})


}