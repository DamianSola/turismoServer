const { Router } = require('express');

const { GetAllTours, getOneTour, postTour, putTour, DeleteTour } = require("../Controllers/Tours.js")

const router = Router()

router.get('/', GetAllTours)
router.get('/:id', getOneTour)
router.post('/', postTour)
router.put('/:id', putTour)
router.delete('/:id', DeleteTour)

module.exports = router