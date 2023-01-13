const {Router} = require("express")
const { getAllServices,postService } = require("../Controllers/Services.js")
const router = Router()

router.get('/', getAllServices)
// router.get('/:id', getOneSubCategory)
router.post('/', postService)
// router.put('/:id', putSubCategory)
// router.delete('/:id', deleteSubCategory)

module.exports = router