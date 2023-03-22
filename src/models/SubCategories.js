const {DataTypes} = require('sequelize')


module.exports = (sequelize) => {
    sequelize.define('subCategories', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        // description: {
        //     type: DataTypes.TEXT,
        // },
        image: {
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
