const {Towns, Activities} = require('../db')



const getAllTowns = async (req, res, next) => {
    let {name} = req.query

    try {
        if(name) {
            const town = await Towns.findOne({where: {name:name}})
            town? res.send(town) : res.send({msg:"town not found"})
        }
        const {count , rows} = await Towns.findAndCount({
            include: {Activities}
        })
        res.send({count , rows})
    } catch (error) {
        next(error)
    }
}

const getOneById = async (req, res, next) => {
    let {id} = req.params;
    
    try{
        let town = await Towns.findByPk(id,
            {include: {Activities}
        })
        town? res.send(town) : res.send({msg: "not found"})
    }catch(err){
        next(err)
    }
}

const postTown = async  (req, res, next) => {
    let {images,description,location,name} = req.body;

    try {
        await Towns.create({
            name: name,
            images: images,
            description: description,
            location:location
        })
        res.send({msg: "town was created"})
    } catch (error) {
        next(error)
    }
}

module.exports = {postTown,getOneById,getAllTowns}