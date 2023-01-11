const { Router } = require('express');
const express = require('express');
const logger = require('morgan');
const { GetAllActivities,GetOneActivity,postActivity,likeActivity,deleteActivity, putActivity } = require('../Controllers/Activities');

const router = Router()

router.get("/", GetAllActivities)
router.get("/:id", GetOneActivity)
router.post("/", postActivity)
router.put("/likes/:id", likeActivity)
router.put("/:id", putActivity)
router.delete("/:id", deleteActivity)

module.exports = router
