const {Router} = require('express')
const {getAllServiceTypes,putServicetype,deleteServiceType,postServiceType,getServiceTypeById} = require('../Controllers/ServiceTypes.js')


const router = Router()
router.get('/', getAllServiceTypes)
router.get('/:id', getServiceTypeById)
router.post('/', postServiceType)
router.put('/:id', putServicetype)
router.delete('/:id', deleteServiceType)

module.exports = router