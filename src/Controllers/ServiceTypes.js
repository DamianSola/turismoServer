const {ServiceTypes, Service} = require('../db.js')

const getAllServiceTypes = async (req,res,next) => {
    let {name} = req.query

    try {
        if(!name){
            let  { count, rows }  = await ServiceTypes.findAndCountAll(
                {include:{model: Service, as: "services"}}
            )
            res.send( { count, rows } )
        }else{
            let serviceType = await ServiceTypes.findOne({where:{id : id}})
            res.send(serviceType)
        }
    } catch (error) {
        next(error)
    }
}

const getServiceTypeById = async (req,res,next) => {
    let {id} = req.params
    try {
        let serviceType = await ServiceTypes.findOne({where:{id:id},
            include:{model:Service, as: "services"}}
            )

        serviceType? res.send(serviceType) : res.send({msg:"service type not found"})
    } catch (error) {
        next(error)   
    }
}
const postServiceType = async (req,res,next) => {
    let {name, image} = req.body

    try {
        await ServiceTypes.create({
            name: name,
            image: image
        })
        res.send({msg:"new service type was created"})
    } catch (error) {
        next(error)
    }
}
const deleteServiceType = async (req,res,next) => {
    let {id} = req.params
    try {
        let serviceType = await ServiceTypes.destroy({where:{id:id}})
        serviceType === 0 ? res.send({msg: "service type not was delete"}) : res.send({msg: "service type was delete"})
    } catch (error) {
        next(error)
    }
}

const putServicetype = async (req,res,next) => {
    let {id} = req.params
    let {name,image} = req.body
    try {
        let serviTypes = await ServiceTypes.update({
            name: name && name,
            image: image && image
        },{where:{id:id}})
        // res.send(serviTypes)
        serviTypes == 1? res.send({msg: 'ok'}): res.send({msg: "not changes"})
    } catch (error) {
        next(error)
    }
}

module.exports = {getAllServiceTypes,putServicetype,deleteServiceType,postServiceType,getServiceTypeById}