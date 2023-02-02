const { Router } = require('express');

const {postTown, getOneById, getAllTowns } = require('../Controllers/Towns.js')

const router = Router()

router.get('/', getAllTowns)
router.get('/:id', getOneById)
router.post('/', postTown)

module.exports = router