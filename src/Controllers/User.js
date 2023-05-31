const {User} = require('../db.js')

const getAllUser = async (req,res,next) => {
    let {name} = req.query
    try{
        if(!name){
            const users = await User.findAll({}) 
        }else{

    }
    }catch(err){
        console.log(err)
    }
}

const loginUser = async (req,res,next) => {
    const {name,password} = req.body;

    try{
        const user = await User.findOne({where:{name,password}})
        if(user) res.send(user)
    }catch(err){
        console.log(err)
    }
}


const registerUser = async (req,res,next) => {
    const user = req.body

    try{
        const newUser = await User.create(user)
        res.send(newUser)
    }catch(err){
        console.log(err)
    }
}

module.exports = {registerUser,loginUser,getAllUser}