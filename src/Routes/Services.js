const {Router} = require("express")
const { getAllServices,postService,putService,GetServiceById,delteService } = require("../Controllers/Services.js")
const router = Router()

router.get('/', getAllServices)
router.get('/:id', GetServiceById)
router.post('/', postService)
router.put('/:id', putService)
router.delete('/:id', delteService)

module.exports = router