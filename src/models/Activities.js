const {DataTypes, STRING} = require('sequelize')

module.exports = (sequelize) => {
    sequelize.define("activities", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validator: {
                is: "+1"
            } 
        },
        description:{
            type: DataTypes.TEXT,
            allowNull: false
        },
        likes:{
                type: DataTypes.INTEGER
            },
        images:{
            type: DataTypes.ARRAY(STRING),
            allowNull: false
        },
        id:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV1,
            primaryKey: true,
            // autoIncrement: true
        }
    })
} 

// export const Activities = sequelize.define('activities', {
//     name: {
//         type: DataTypes.STRING,
//         allowNull: false
//     },
//     description:{
//         type: DataTypes.STRING,
//         allowNull: false
//     },
//     
// })

// Activities.belongsToMany(Towns, { through: 'Activities_Towns' });
