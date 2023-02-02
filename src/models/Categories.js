const {DataTypes} = require('sequelize')

module.exports =  (sequelize) => {
    sequelize.define('categories', {
        name:{
            type: DataTypes.STRING,
            allowNull: false
        },
        image:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        }
    })
}