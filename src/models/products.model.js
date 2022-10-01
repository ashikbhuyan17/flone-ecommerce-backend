const mongoose = require('mongoose');
const uuidv4 = require('uuid');

var productSchema = new mongoose.Schema({
    // _id: { type: String, default: uuidv4 },
    name: {
        type: String,
        required: true,
        trim: true,
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    price: {
        type: Number,
        required: true
    },
    discount: {
        type: Number
    },
    offerEnd: {
        type: Date
    },
    newProduct: {
        type: Boolean
    },
    rating: { type: Number },
    saleCount: {
        type: Number
    },
    tag: [{
        type: String
    }],
    quantity: {
        type: Number,
        required: true
    },
    shortDescription: {
        type: String
    },
    fullDescription: {
        type: String,
        required: true,
        trim: true
    },
    variation: [{
        color: String,
        size: [{
            name: String,
            stoke: Number
        }]
    }],
    // color: [{
    //     type: String
    // }],
    // size: [{
    //     type: String
    // }],
    image: [
        {
            img: { type: String }
        }
    ],
    reviews: [
        {
            userId: { type: mongoose.Schema.ObjectId, ref: 'User' },
            review: String
        }
    ],
    category: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'Category',
        required: true
    }],
    createBy: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User',
        required: true
    },
}, { timestamps: true });

//Export the model
module.exports = mongoose.model('Product', productSchema);
