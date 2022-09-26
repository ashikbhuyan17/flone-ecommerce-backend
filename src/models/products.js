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
        type: Number,
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
    updateAt: Date
}, { timestamps: true });

//Export the model
module.exports = mongoose.model('Product', productSchema);
