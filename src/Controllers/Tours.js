const {Tours, Service} = require("../db.js")


const GetAllTours = async (req,res,next) => {
    let {name} = req.query;
    try{
        if(!name){
            let  { count, rows }  = await Tours.findAndCountAll()
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
        await Tours.create({
            name:name,
            description: description,
            images: images,
            servicesId: services,
        },{
            include:{model: Service}
        })
        res.send({msg: "tour was created"})
    }catch(err){
        next(err)
    }
}
const putTour = async (req,res,next) => {
    let {id} = req.params;
    let {name, description, images,services} = req.body;
    try{
        name && await Tours.update({name:name},{where:{id:id}})
        description && await Tours.update({description:description},{where:{id:id}})
        images && await Tours.update({images:images}, {where:{id:id}}),
        services && await Tours.update({services:services}, {where:{id:id}})
        res.send({msg: "OK"})
    }catch(err){
        next(err)
    }
}

module.exports = {GetAllTours, getOneTour, DeleteTour, postTour, putTour }