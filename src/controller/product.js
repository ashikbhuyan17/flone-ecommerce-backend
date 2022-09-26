
const Product = require('../models/products')
const slugify = require('slugify')

exports.createProduct = (req, res) => {
    /* 
    for single file
    res.status(200).json({ file: req.file, body: req.body }) 
    */

    // for multiple file
    // res.status(200).json({ file: req.files, body: req.body })


    const { name, price, description, offer, reviews, category, quantity } = req.body
    let productPicture = []
    if (req.files.length > 0) {
        productPicture = req.files.map((file) => {
            return { img: file.filename }
        })
    }
    const product = new Product({
        name,
        slug: slugify(name),
        price,
        quantity,
        description,
        productPicture,
        category,
        createBy: req.user._id
    })
    product.save(((err, product) => {
        if (err) return res.status(400).json({ err })
        if (product) {
            res.status(201).json({ product })
        }
    }))


}