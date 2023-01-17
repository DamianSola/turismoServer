const { Router } = require('express');
const {ResumeAllDates} = require("../Controllers/AdminDates")
const router = Router()

router.get("/" , ResumeAllDates)

module.exports = router
