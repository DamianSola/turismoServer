const {Sequelize} = require('sequelize')
const fs = require('fs')
const dotenv = require('dotenv').config()
const path = require('path')
const {
  DB_USER, DB_PASSWORD, DB_HOST, DB_NAME
} = process.env;
// console.log(DB_HOST, DB_PASSWORD, DB_USER)

// const sequelize =
//   process.env.NODE_ENV === "production"
//     ? new Sequelize({
//         database: DB_NAME,
//         dialect: "postgres",
//         host: DB_HOST,
//         port: 5432,
//         username: DB_USER,
//         password: DB_PASSWORD,
//         pool: {
//           max: 3,
//           min: 1,
//           idle: 10000,
//         },
//         dialectOptions: {
//           ssl: {
//             require: true,
//             rejectUnauthorized: false,
//           },
//           keepAlive: true,
//         },
//         ssl: true,
//       })
//     : new Sequelize(
//         `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/development`,
//         { logging: false, native: false }
//       );

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`, {
  logging: false, // set to console.log to see the raw SQL queries
  native: false, // lets Sequelize know we can use pg-native for ~30% more speed
});
const basename = path.basename(__filename);


const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });


  // Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach(model => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

// console.log(sequelize.models)
const {Activities, Towns, Categories, SubCategories, Culture, Service, ServiceTypes, Tours,} = sequelize.models

Towns.hasMany(Activities)//corregido
SubCategories.hasMany(Activities) // corregido
Categories.hasMany(SubCategories) // corregido
Activities.belongsToMany(Culture, {through:'activities_culture'})
Culture.belongsToMany(Activities, {through:'activities_culture' })
ServiceTypes.hasMany(Service) // corregido
Service.belongsToMany(Tours, {through: "service-tours"}) // corregido
Tours.belongsToMany(Service, {through: "service-tours"})// corregido

// Activities.belongsToMany(Towns, {through:'activities_tows'})
// Towns.belongsToMany(Activities, {through:'activities_tows'})
// Categories.belongsToMany(SubCategories, {through:'Categories_SubCategories'})
// SubCategories.belongsToMany(Categories,  {through:'Categories_SubCategories'})
// Activities.belongsToMany(SubCategories, {through:'activities_subCategories'})
// SubCategories.belongsToMany(Activities, {through:'activities_subCategories'})
// Activities.belongsToMany(Culture, {through:'activities_culture'})
// Culture.belongsToMany(Activities, {through:'activities_culture' })
// Service.belongsTo(ServiceTypes, {through: "service-types"})
// // ServiceTypes.belongsToMany(Service, {through: "service-types"})
// Service.belongsToMany(Tours, {through: "service-tours"})
// Tours.belongsToMany(Service, {through: "service-tours"})







module.exports = {
  ...sequelize.models,
  conn: sequelize,
}