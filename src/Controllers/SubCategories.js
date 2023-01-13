const {SubCategories} = require("../db.js")

const GetAllSubCategories = async (req,res,next) => {
    let {name} = req.query
    try{
        if(name) {
            let subCategory = await SubCategories.findOne({where: {name: name}});
            subCategory ? res.send(subCategory) : res.send({msg: "sub category not found"})
        }else{
            let allSubCategories = await SubCategories.findAll()
            res.send(allSubCategories)
        }
    }catch(err){
        next(err)
    }
}

const getOneSubCategory = async (req,res,next) => {
    let {id} = req.params;
    try{
        let subCategory = await SubCategories.findByPk(id);
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
    let {name, categoryId} = req.body;
    try{
        await SubCategories.create({name: name, categoryId:categoryId})
        res.send({msg: "new sub category was created"})
    }catch(err){
        next(err)
    }
}

module.exports = {getOneSubCategory, GetAllSubCategories, postSubCategory, putSubCategory, deleteSubCategory}