const { Router } = require('express');
const {registerUser,loginUser,getAllUser} = require("./../Controllers/User")

const router = Router()

router.post('/register',registerUser)
router.post('/login',loginUser)
router.get('/',getAllUser)

module.exports = router
