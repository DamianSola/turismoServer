const {User} = require('../db.js')

const getAllUser = async (req,res,next) => {
    let {name} = req.query
    try{
        if(!name){
            const users = await User.findAll({}) 
            res.send(users)
        }else{
            const users = await User.findOne({where:{name:name}})
        }
    }catch(err){
        next(err)
        console.log(err)
    }
}

const loginUser = async (req,res,next) => {
    const {email,password} = req.body;

    try{
        const user = await User.findOne({where:{email,password}})
        if(user) res.send(user)
        else res.send({msg: "not exist"})
    }catch(err){
        console.log(err)
        next(err)
    }
}


const registerUser = async (req,res,next) => {
    const user = req.body
    console.log(user)
    try{
        const newUser = await User.create(user)
        res.send(newUser)
    }catch(err){
        console.log(err)
        next(err)
    }
}

module.exports = {registerUser,loginUser,getAllUser}