const mongoose = require('mongoose');
var productSchema = new mongoose.Schema({
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
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    offer: {
        type: Number
    },
    color: [{
        type: String
    }],
    size: [{
        type: String
    }],
    productPicture: [
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
    category: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Category',
        required: true
    },
    createBy: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User',
        required: true
    },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
}, { timestamps: false });

//Export the model
module.exports = mongoose.model('Product', productSchema);
