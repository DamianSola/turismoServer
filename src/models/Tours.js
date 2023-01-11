const {DataTypes} = require('sequelize')

module.exports = (sequelize) => {
    sequelize.define( 'tours', {
        name:{
            type:DataTypes.STRING,
            allowNull: false
        },
        description:{
            type:DataTypes.TEXT,
        },
        image:{
            type: DataTypes.STRING,
        },
        id:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        }
    }
    )
}