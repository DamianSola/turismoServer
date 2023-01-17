const {Activities, Towns, 
    Categories, SubCategories, 
    Culture, Service, 
    ServiceTypes, Tours
} = require("../db")


const  models  = require('../db')

const ResumeAllDates = async (req,res,next) => {

    async function CountAll(){
        const activities ={title:"ACTIVITIES", count : await Activities.count()}
        const towns ={ title:'TOWNS', count: await Towns.count()}
        const categories = {title:'CATEGORIES', count: await Categories.count()}
        const subCategories = {title: "SUB CATEGORIES", count: await SubCategories.count()}
        const culture = {title:"CULTURE", count: await Culture.count()}
        const tours = {title:"TOURS", count: await Tours.count()}
        const service = {title:"SERVICE", count: await Service.count()}
        const serviceTypes ={title:"SERVICE TYPES", count:  await ServiceTypes.count()}
        return [activities, towns, tours, culture, categories, subCategories, service, serviceTypes]
    }

   let alldate = await CountAll()
    // console.log(count, rows)
    res.send(alldate)


}

module.exports = {ResumeAllDates}