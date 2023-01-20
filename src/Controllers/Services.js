const {Service, Tours} = require('../db.js')

const getAllServices = async (req,res,next) => {
    let {name} = req.query
    try {
        if(name){
            let service = await Service.findOne({where: {name: name}, include:{Tours}})
            res.send(service)
        }else{
            const { count, rows } = await Service.findAndCountAll()
            res.send( { count, rows } )
        }
    } catch (error) {
        next(error)
    }
}

const postService = async (req,res,next) => {
    let {name,phone,webSite,Adress,description,images,punctuation,open,serviceTypeId} = req.body
    try {
        await Service.create({
            name: name,
            phone: phone,
            webSite: webSite,
            Adress:Adress,
            description:description,
            images:images,
            punctuation:punctuation,
            open:open,
            serviceTypeId:serviceTypeId
        })
        res.send({msg: "service was created"})
        
    } catch (error) {
        next(error)
        
    }
}


const putService = async (req, res, next) => {
    let {id} = req.params;
    let {name, phone, webSite, Adress, description, images, punctuation, open, serviceTypeId } = req.body
    // console.log(req.body)
    // res.send(req.body)
    try {
        let service = await Service.update({
            name: name && name,
            phone: phone && phone,
            webSite: webSite && webSite,
            Adress: Adress && Adress,
            description: description && description,
            images: images && images,
            punctuation: punctuation && punctuation,
            open: open !== null && open,
            serviceTypeId: serviceTypeId && serviceTypeId
        },{where: {id:id}})
        res.send([{msg:"ok"}, service])
    } catch (error) {
        next(error)
    }
}

const GetServiceById = async (req, res, next) => {
    let {id} = req.params
    try {
        let service = await Service.findOne({where:{id: id}})
        service ? res.send(service) : res.send({msg: "service not found"}) 
    } catch (error) {
        next(error)
    }
}

const delteService = async (req, res, next)=>{
    let {id} = req.params;
    try {
        let serv = await Service.destroy({where:{id:id}})
        serv === 1? res.send({msg:"the service was deleted"}): res.send({msg:"the service was not delted"})
    } catch (error) {
        next(error)
    }
}


module.exports = {getAllServices,postService, putService,GetServiceById,delteService}