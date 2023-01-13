const {Service} = require('../db.js')

const getAllServices = async (req,res,next) => {
    let {name} = req.query
    try {
        if(name){
            let service = await Service.findOne({where: {name: name}})
            res.send(service)
        }else{
            let services = await Service.findAll()
            res.send(services)
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

module.exports = {getAllServices,postService}