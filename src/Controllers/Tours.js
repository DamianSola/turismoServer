const {Tours} = require("../db.js")


const GetAllTours = async (req,res,next) => {
    let {name} = req.query;
    try{
        if(!name){
            let Alltours = await Tours.findAll()
            res.send(Alltours)
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
        let tour = await Tours.findByPk(id)
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
    let {image, description, name} = req.body;
    try{
        await Tours.create({
            name:name,
            description: description,
            image: image
        })
        res.send({msg: "tour was created"})
    }catch(err){
        next(err)
    }
}
const putTour = async (req,res,next) => {
    let {id} = req.params;
    let {name, description, image} = req.body;
    try{
        name && await Tours.update({name:name},{where:{id:id}})
        description && await Tours.update({description:description},{where:{id:id}})
        image && await Tours.update({image:image}, {where:{id:id}})
        res.send({msg: "OK"})
    }catch(err){
        next(err)
    }
}

module.exports = {GetAllTours, getOneTour, DeleteTour, postTour, putTour }