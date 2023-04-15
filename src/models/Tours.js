const {DataTypes, STRING} = require('sequelize')

module.exports = (sequelize) => {
    sequelize.define( 'tours', {
        name:{
            type:DataTypes.STRING,
            allowNull: false
        },
        description:{
            type:DataTypes.TEXT,
        },
        images:{
            type: DataTypes.ARRAY(STRING),
        },
        id:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        }
    }
    )
}