const {DataTypes, STRING} = require('sequelize')

module.exports = (sequelize) => {
    sequelize.define("service", {
        name:{
            type: DataTypes.STRING,
            allowNull: false
        },
        phone:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        webSite:{
            type: DataTypes.STRING,
            allowNull: true
        },
        Adress: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type:DataTypes.TEXT,
            allowNull: false
        },
        images: {
            type: DataTypes.ARRAY(STRING),
            allowNull: true
        },
        punctuation: {
            type: DataTypes.INTEGER
        },
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        open:{
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    })
}