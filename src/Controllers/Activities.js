const {Activities,SubCategories, Towns} = require('../db.js')




const GetAllActivities = async (req,res,next) => {
    let {name} = req.query
    try{
        if(!name){
            const {count, rows} = await Activities.findAndCountAll(
                {include:{model: SubCategories, as: "subCategory"}}
                )
            res.send({count, rows}) 
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
        let activity = await Activities.findByPk(id, {include:[
            {model: Towns, as: "towns"}, {model: SubCategories, as: "subCategory"}
        ]})
        activity? res.send(activity) : res.send({msg: "activity not found"}).status(404)
    }catch(err){
        next(err)
    }
    
}

const postActivity = async (req,res,next) => {
    let {name, description, images,subCategoryId, townId } = req.body
    // console.log(subCategoryId)
    try{
        const subCat = await SubCategories.findByPk(subCategoryId)
        const activity = await Activities.create({
            name: name,
            description: description,
            images: images,
            likes: 0,
            subCategoryId:subCategoryId,
            townId: townId
        },
        {   include:[{model: SubCategories, as: "subCategory"}, {model: Towns, as:'towns'}]}
        )
        // const subCat = await SubCategories.findByPk(subCategoryId)
        // await subCat.addActivity(activity);

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
    let {name, description,images,townsId,subCategoryId} = req.body
    let {id} = req.params
    console.log(req.body)
    try{ 
        
        name && await Activities.update({name:name},{where:{id:id}})
        description && await Activities.update({description:description},{where:{id:id}})
        images && await Activities.update({images:images}, {where:{id:id}})
        townsId && await Activities.update({townsId:townsId}, {where:{id:id}})
        subCategoryId && await Activities.update({towsubCategoryId:subCategoryId}, {where:{id:id}})

        res.send({msg:"OK"})
    }catch(err){
        console.log(err)
        next(err)
    }
}

module.exports = {GetAllActivities,GetOneActivity,postActivity,likeActivity,deleteActivity,putActivity}