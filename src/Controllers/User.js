const {User} = require('../db.js')

const getAllUser = async (req,res,next) => {
    let {name} = req.query
    try{
        if(!name){
            const users = await User.findAll({}) 
            res.send(users)
        }else{
            const users = await User.findOne({where:{name:name}}) 
            res.send(users)
        }
    }catch(err){
        next(err)
        console.log(err)
    }
}

const loginUser = async (req,res,next) => {
    const {email,password} = req.body;

    try{
        if(password.length === 0 ) res.send({msg: "porfavor escriba una contraseña",status: 400})
        const user = await User.findOne({where:{email}})
        if(!user) res.send({msg: "el usuario no existe",status: 404})
        if(user.password === password) res.send(user)
        else res.send({msg: "contraseña incorrecta", status: 500})
    }catch(err){
        console.log(err)
        next(err)
    }
}


const registerUser = async (req,res,next) => {
    const {name, last_name, password, email} = req.body

    try{
        const checkEmail = await User.findOne({where: {email}})
        if(checkEmail) res.send({msg: "el mail ya esta registrado"})
        else{
            const newUser = await User.create({
                name: name,
                last_name: last_name,
                password: password,
                email: email,
                confirm_email: false,
                admin_jeff: false,
            })
            res.send(newUser)
        }
        }catch(err){
        console.log(err)
        next(err)
    }
}


const confirmUser = async (req,res,next) => {
    const {email, confirm_email} = req.body
    try{
        const user = await User.findOne({where: {email}})
        await user.update({confirm_email:true})
        res.send({msg: "confirmado", user})
    }catch(error){
        next(error)
    }
}
const deleteUser = async (req,res,next) => {
    const {id} = req.params;
    try{
        await User.destroy({where: {id}})
        res.send("usuario eliminado")
    }catch(error){
        next(error)
    }
}

module.exports = {registerUser,loginUser,getAllUser,confirmUser,deleteUser}