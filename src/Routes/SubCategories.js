const {Router} = require("express")
const { GetAllSubCategories, getOneSubCategory, postSubCategory, putSubCategory, deleteSubCategory } = require("../Controllers/SubCategories.js")
const router = Router()

router.get('/', GetAllSubCategories)
router.get('/:id', getOneSubCategory)
router.post('/', postSubCategory)
router.put('/:id', putSubCategory)
router.delete('/:id', deleteSubCategory)

module.exports = router