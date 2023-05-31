const {DataTypes, STRING} = require('sequelize')

module.exports = (sequelize) => {
    sequelize.define('user', {
        name:{
            type: DataTypes.STRING,
            allowNull: false
        },
        last_name:{
            type: DataTypes.STRING,
            allowNull: false
        },
        email:{
            type: DataTypes.STRING,
            allowNull: false
        },
        password:{
            type: DataTypes.STRING,
            allowNull: false
        },
        confirm_email:{
            type: DataTypes.BOOLEAN,

        },
        admin_jeff:{
            type: DataTypes.BOOLEAN,
        },
        id:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV1,
            primaryKey: true,
        }
    })
}