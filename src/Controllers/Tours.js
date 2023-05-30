const {Tours, Service} = require("../db.js")


const GetAllTours = async (req,res,next) => {
    let {name} = req.query;
    try{
        if(!name){
            let  { count, rows }  = await Tours.findAndCountAll({include:{model: Service}})
            res.send( { count, rows } )
        }else{
            let tour = await Tours.findOne({where: {name:name}})
            tour? res.send(tour) : res.send({msg: "tour not found"})
        }
    }catch(err){
        next(err)
    }
}

const getOneTour = async (req,res,next) => {
    let {id} = req.params;
  try{
        let tour = await Tours.findByPk(id, {include:{model: Service}})
        tour? res.send(tour) : res.send({msg: "tour not found"})
    }catch(err){
        next(err)
    }
}
const DeleteTour = async (req,res,next) => {
    let {id} = req.params;
    try{
        await Tours.destroy({where : {id : id}})
        res.send({msg: "the tour was deleted"})
    }catch(err){
        next(err)
    }
}
const postTour = async (req,res,next) => {
    let {images, description, name, services} = req.body;
    try{
        let newTour = await Tours.create({
            name:name,
            description: description,
            image: images,
            // servicesId: services,
        })
        await newTour.addService(services)

        res.send({msg: "tour was created", newTour})
    }catch(err){
        next(err)
    }
}
const putTour = async (req,res,next) => {
    let {id} = req.params;
    let {services} = req.body;
    let dates = req.body
    try{
        // name && await Tours.update({name:name},{where:{id:id}})
        // description && await Tours.update({description:description},{where:{id:id}})
        // image && await Tours.update({image:image}, {where:{id:id}}),
        // services && await Tours.update({services:services}, {where:{id:id}})
        let tour = await Tours.findByPk(id)
        await tour.update(dates)
        services && await tour.setServices(services)

        // services && await activity.setServices(services)
        res.send({msg: "OK",tour})
    }catch(err){
        next(err)
    }
}

module.exports = {GetAllTours, getOneTour, DeleteTour, postTour, putTour }