const express = require('express')
const router = express.Router()
const Category = require('../models/category.model')
const { addCategory, getCategories } = require('../controller/category.controller')
const { requireSignIn, adminMiddleware, userMiddleware } = require('../common-middleware')

router.post('/category/create', requireSignIn, adminMiddleware, addCategory)
router.get('/category/getCategory', requireSignIn, userMiddleware, getCategories)

module.exports = router
