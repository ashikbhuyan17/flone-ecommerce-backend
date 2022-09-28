const express = require('express')
const { requireSignIn, adminMiddleware } = require('../common-middleware')
const { createProduct, getProduct } = require('../controller/product.controller')
const router = express.Router()
const multer = require('multer')
const shortid = require('shortid')
const path = require('path')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(path.dirname(__dirname), 'uploads'))
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, shortid.generate() + '-' + file.originalname)
    }
})
const upload = multer({ storage })


// router.post('/product/create', requireSignIn, adminMiddleware, upload.single('productPicture'), createProduct)
router.post('/product', requireSignIn, adminMiddleware, upload.array('productPicture'), createProduct)
router.get('/product', getProduct)

// router('/product')
// .post(requireSignIn, adminMiddleware, upload.array('productPicture'), createProduct)
// .get(getProduct)


module.exports = router