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
            let subcategories  = await SubCategories.findAll({
                include:{model: Activities, as:"activities"},
                // include:{model: Categories, as: "category"}
            })
            res.send( subcategories )
        }
    }catch(err){
        next(err)
    }
}

const getOneSubCategory = async (req,res,next) => {
    let {id} = req.params;
    try{
        let subCategory = await SubCategories.findByPk(id, {
            include:{model: Activities, as:"activities"},
            // include:{model: Categories, as: "category"}
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
    let {name} = req.body
    try{
        await SubCategories.update({name : name}, {where : {id : id}})
        res.send({msg: "Ok"})
    }catch(err){
        next(err)
    }
}

const postSubCategory = async (req,res,next) => {
    let {name, categoryId, actividad, image} = req.body;
    try{
        await SubCategories.create({name: name, categoryId:categoryId, image:image},
            // {include:[{model: Activities, as: "actividad", forenigKey: actividad }]}
            )
        res.send({msg: "new sub category was created"})
    }catch(err){
        next(err)
    }
}

module.exports = {getOneSubCategory, GetAllSubCategories, postSubCategory, putSubCategory, deleteSubCategory}