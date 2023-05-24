const {SubCategories, Activities, Categories} = require("../db.js")

const GetAllSubCategories = async (req,res,next) => {
    let {name} = req.query
    try{
        if(name) {
            let subCategory = await SubCategories.findOne({where: {name: name},
                include:{model: Activities, as:"activities"}, 
                include:{model: Categories, as: "category"}
            });
            subCategory ? res.send(subCategory) : res.send({msg: "sub category not found"})
        }else{
            let {count, rows}  = await SubCategories.findAndCountAll({
                include:{model: Activities, as:"activities"},
                // include:{model: Categories, as: "category"}
            })
            res.send( {count, rows} )
        }
    }catch(err){
        next(err)
    }
}

const getOneSubCategory = async (req,res,next) => {
    let {id} = req.params;
    try{
        let subCategory = await SubCategories.findByPk(id, {
            include:[
                {model: Activities, as:"activities"},
            {model: Categories, as: "category"}
        ]
        });
        subCategory ? res.send(subCategory) : res.send({msg: "sub category not found"})
    }catch(err){
        next(err)
    }
}
const deleteSubCategory = async (req,res,next) => {
    let {id} = req.params;
    try{
        await SubCategories.destroy({where: {id: id}})
        res.send({msg: "sub category was deleted"})
    }catch(err){
        next(err)
    }
}
const putSubCategory = async (req,res,next) => {
    let {id} = req.params;
    let dates = req.body
    try{
        let subCategory = await SubCategories.update(dates,{where:{id:id}})
        res.send({msg: "Ok", subCategory})
    }catch(err){
        next(err)
    }
}

const postSubCategory = async (req,res,next) => {
    let {name, categoryId, description, image} = req.body;
    try{
        await SubCategories.create({name: name, categoryId:categoryId, image:image, description:description},
            // {include:[{model: Activities, as: "actividad", forenigKey: actividad }]}
            )
        res.send({msg: "new sub category was created"})
    }catch(err){
        next(err)
    }
}

module.exports = {getOneSubCategory, GetAllSubCategories, postSubCategory, putSubCategory, deleteSubCategory}