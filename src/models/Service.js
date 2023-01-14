const {DataTypes, STRING} = require('sequelize')

module.exports = (sequelize) => {
    sequelize.define("service", {
        name:{
            type: DataTypes.STRING,
            allowNull: false,
            validate:{
                notEmpty: true, 
            }
        },
        phone:{
            type: DataTypes.STRING,
            allowNull: false,
            validate:{
                isNumeric: true, 
            }
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
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV1,
            primaryKey: true,
        },
        open:{
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    })
}