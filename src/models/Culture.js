const {DataTypes, STRING} = require('sequelize')

module.exports = (sequelize) => {
    sequelize.define('culture', {
        name:{
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
        },
        Image:{
            type: DataTypes.ARRAY(STRING),
        }
    })
}