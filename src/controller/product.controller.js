
const Product = require('../models/products.model')
const slugify = require('slugify')

exports.createProduct = (req, res) => {
    console.log(req.body)

    const { name, price, description, offer, reviews, category, quantity, color, size } = req.body
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
        color,
        size,
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

const getProduct = async (req, res) => {
    try {
        const product = await Product.find({})
        if (!product) {
            return res.status(404).json({ error: "Product Not Found" })
        }

        return res.status(200).json({
            message: "Product Found",
            product
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" })
    }

}

module.exports.getProduct = getProduct