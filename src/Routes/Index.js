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

module.exports = router