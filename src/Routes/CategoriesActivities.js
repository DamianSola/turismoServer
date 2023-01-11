const { Router } = require('express');
const express = require('express');
const logger = require('morgan');
const { GetOneActivity } = require('../Controllers/Activities.js');
const {GetAllCategories , postCategories, putCategories, deleteCategories, GetByIdCategory}= require("../Controllers/CategoriesActivities.js")

const router = Router()

router.get("/", GetAllCategories)
router.put("/:id", putCategories)
router.delete("/:id", deleteCategories)
router.post("/", postCategories)
router.get("/:id", GetByIdCategory)

module.exports = router