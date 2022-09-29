
const Product = require('../models/products.model')
const slugify = require('slugify')

// Create and Save a new Product
exports.createProduct = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to post can not be empty!"
        });
    }

    const { name, price, description, discount, reviews, category, quantity, color, size, rating } = req.body
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
        rating,
        discount,
        createBy: req.user.id
    })
    console.log("product", product)

    product.save(((err, product) => {
        if (err) return res.status(400).json({ err })
        if (product) {
            res.status(201).json({ product })
        }
    }))


}

// Retrieve all Product from the database.
exports.getProduct = async (req, res) => {
    Product.find({})
        .populate("category", "name")
        .populate("createBy", "username email -_id")
        .exec((error, product) => {
            if (!product) {
                return res.status(404).json({ error: "Product Not Found" })
            }
            return res.status(200).json({
                message: "Product Found",
                product
            })
        })
}

// Find a single Product with an id
exports.findOne = async (req, res) => {
    const id = req.params.productId;
    Product.findById(id)
        .populate("category", "name")
        .populate("createBy", "username email -_id")
        .exec((error, product) => {
            if (!product) {
                return res.status(404).send({ message: "Not found Product with id " + id });
            }
            return res.status(200).json({
                message: "Found Product with id " + id,
                product
            });
        })
};


exports.deleteProduct = (req, res) => {
    const id = req.params.productId;

    Product.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete Product with id=${id}. Maybe Tutorial was not found!`
                });
            } else {
                res.send({
                    message: "Product was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Tutorial with id=" + id
            });
        });
};