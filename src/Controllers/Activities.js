const {Activities,SubCategories, Towns, Service} = require('../db.js')




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
            activity? res.send(activity) :  res.status(404).send({msg: "activity not found"})
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
            {model: Towns, as: "towns"}, {model: SubCategories, as: "subCategory"}, {model:Service}
        ]})
        activity? res.send(activity) : res.send({msg: "activity not found"}).status(404)
    }catch(err){
        next(err)
    }
    
}

const postActivity = async (req,res,next) => {
    let {name, description, images,subCategoryId, townsId, townId, services } = req.body;
    try{
        // const subCat = await SubCategories.findByPk(subCategoryId)
        const activity = await Activities.create({
            name: name,
            description: description,
            images: images,
            likes: 0,
            subCategoryId:subCategoryId,
            townsId: townsId, 
            // townId: townId, 
        },
        {   include:[
            {model: SubCategories, as: "subCategory"},
            {model: Towns, as:'towns'}, 
        ]}
        )
        await activity.addService(services)

        res.send({msg: "la actividad fue agragada"})
    }catch(err){
        console.log(err)
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

// const deleteSErviceInActivity = async (req, res, next) => {

// }

const putActivity = async (req, res, next) => {
    let {townsId,subCategoryId,services} = req.body
    let dates = req.body
    let {id} = req.params
    console.log(dates)
    try{ 
        const activity = await Activities.findOne({ where: { id } })
        services && await activity.setServices(services)
        subCategoryId && await activity.setSubCategories(subCategoryId)
        townsId && await activity.setTowns(townsId)
        await Activities.update(dates,{where:{id:id}})
        res.send({msg:"OK"})
    }catch(err){
        console.log(err)
        next(err)
    }
}

module.exports = {GetAllActivities,GetOneActivity,postActivity,likeActivity,deleteActivity,putActivity}