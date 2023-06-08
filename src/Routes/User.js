const { Router } = require('express');
const {registerUser,loginUser,getAllUser,confirmUser,deleteUser} = require("./../Controllers/User")

const router = Router()

router.post('/register',registerUser)
router.post('/login',loginUser)
router.get('/',getAllUser)
router.post('/auth-confirm', confirmUser)
router.delete("/:id", deleteUser)

module.exports = router
