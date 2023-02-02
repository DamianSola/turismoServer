const {Categories, SubCategories} = require('../db.js')
const axios = require('axios')

const GetAllCategories = async (req,res,next) => {
    let {name} = req.query;
    try{
        if(name) {
            let category = await Categories.findOne({where:{name:name},
            include: {model: SubCategories,  as: "subCategories"}
            });

            category? res.send(category) : res.send({msg: "category not found"})
        }else {
            const { count, rows } = await Categories.findAndCountAll({
                include: {model: SubCategories,  as: "subCategories"}
            })
            res.send( { count, rows} )
        }
    }catch(err){
        // console.log(err)
        next(err)
    }
}

const GetByIdCategory = async (req,res,next) => {
    let {id} = req.params;
    try{
        let category = await Categories.findByPk(id,{
            include: {model: SubCategories,  as: "subCategories"}
        })
        category? res.send(category) : res.send({msg:"category not found"})
    }catch(err){
        next(err)
    }
}

const postCategories = async (req, res, next) => {
    let { name } = req.body
    try {
        await Categories.create({ name: name })
        res.send({ msg: "new category was created" })
    } catch (err) {
        console.log(err)
        next(err)
    }
}

const putCategories = async (req, res, next) => {
    let { id } = req.params;
    let { name } = req.body;
    try {
        if (name) {
            await Categories.update({ name: name }, { where: { id: id } })
            res.send({ msg: "OK" })
        } else {
            res.send({ msg: "without changes" })
        }
    } catch (err) {
        next(err)
    }
}

const deleteCategories = async (req, res, next) => {
    let { id } = req.params;
    try {
        await Categories.destroy({ where: { id: id } })
        res.send({ msg: "category was deleted" })
    } catch (err) {
        next(err)
    }
}

module.exports = { GetAllCategories, postCategories, putCategories, deleteCategories, GetByIdCategory }
