const { Router } = require('express');
const express = require('express');
const logger = require('morgan');

const router = Router()

router.use(express.json())
router.use(logger('tiny'))

router.use("/activities", require('./Activities.js'))
router.use("/categories", require("./CategoriesActivities.js"))
router.use("/tours", require("./Tours.js"))
router.use("/subcategories", require("./SubCategories.js"))
router.use('/services', require("./Services.js"))
router.use('/serviceTypes', require('./ServiceTypes'))
router.use('/admin', require('./Admin'))
router.use('/towns', require('./Towns'))
router.use('/users', require('./Users'))
module.exports = router