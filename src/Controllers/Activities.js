const axios  = require('axios')
// const { where } = require('sequelize')
const {Activities} = require('../db.js')



const GetAllActivities = async (req,res,next) => {
    let {name} = req.query
    try{
        if(!name){
            const AllActivities = await Activities.findAll()
            res.send(AllActivities)
        }else{
            const activity = await Activities.findOne({where: {name: name}})
            activity? res.send(activity) :  res.send({msg: "activity not found"}).status(404)
        }
    }catch(err){
        console.log(err)
        next(err)
    }
  
}

const GetOneActivity = async (req,res,next) => {
    let {id} = req.params;
    try{
        let activity = await Activities.findByPk(id)
        activity? res.send(activity) : res.send({msg: "activity not found"}).status(404)
    }catch(err){
        console.log(err)
        next(err)
    }
    
}

const postActivity = async (req,res,next) => {
    let {name, description, images,subCategoryId, townId } = req.body
    // console.log(subCategoryId)
    try{
        const activity = await Activities.create({
            name: name,
            description: description,
            images: images,
            likes: 0,
            subCategoryId: subCategoryId,
            townId: townId
        })
        // await activity.addsubCategoryId(subCategoryId);

        res.send({msg: "la actividad fue agragada"})
    }catch(err){
        console.log(err)
        // res.send({msg: "could not add activity"})
        next(err)
    }
}

const likeActivity = async (req, res, next) => {
    let {id} = req.params
    console.log(id)
    try{
    let activity = await Activities.findByPk(id)
    activity.likes += 1;
    await activity.save()
    res.send(activity)
    }catch(err){
        console.log(err)
        next(err)
    }
}

const deleteActivity = async (req, res, next) => {
    let {id} = req.params;
    try{
        await Activities.destroy({where: {id : id}})
        res.send({msg: "the activity was remove"})

    }catch(err){
        console.log(err)
        next(err)
    }
}

const putActivity = async (req, res, next) => {
    let {name, description,images,townId,subCategoryId} = req.body
    let {id} = req.params
    console.log(req.body)
    try{ 
        
        name && await Activities.update({name:name},{where:{id:id}})
        description && await Activities.update({description:description},{where:{id:id}})
        images && await Activities.update({images:images}, {where:{id:id}})
        townId && await Activities.update({townId:townId}, {where:{id:id}})
        subCategoryId && await Activities.update({towsubCategoryIdnId:subCategoryId}, {where:{id:id}})

        res.send({msg:"OK"})
    }catch(err){
        console.log(err)
        next(err)
    }
}

module.exports = {GetAllActivities,GetOneActivity,postActivity,likeActivity,deleteActivity,putActivity}