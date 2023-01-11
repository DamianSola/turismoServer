const {DataTypes} = require('sequelize')

module.exports = (sequelize) => {
    sequelize.define('serviceTypes', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        image: {
            type: DataTypes.STRING,
        },
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        }
    })
}