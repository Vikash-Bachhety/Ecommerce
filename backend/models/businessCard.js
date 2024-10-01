const mongoose = require('mongoose');
const productSchema = require('./product.js');

const businessCardSchema = new mongoose.Schema({
    category: { 
        type: String, 
        required: true 
    },
    subcategory: { 
        type: String, 
        required: true 
    },
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'product' }],
}, { timestamps: true });

module.exports = mongoose.model('BusinessCard', businessCardSchema);
