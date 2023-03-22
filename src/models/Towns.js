const {DataTypes, STRING} = require('sequelize')



module.exports = (sequelize) => {
    sequelize.define('towns', {
        name:{
            type: DataTypes.STRING,
            allowNull: false
        },
        location:{
            type: DataTypes.STRING,
            allowNull: false
    
        },
        description:{
            type: DataTypes.TEXT,
            allowNull: false
        },
        images:{
            type: DataTypes.ARRAY(STRING),
            allowNull: false
        },
        likes:{
            type: DataTypes.INTEGER
        },
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        }
    })
}


// export {Towns, Activities}