const mongoose = require('mongoose');
const User = require ('../models/user.js');

const productSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true 
    },
    description: { 
        type: String, 
        required: true 
    },
    price: { 
        type: Number, 
        required: true, 
        min: 0 
    },
    stock: { 
        type: Number, 
        required: true, 
        min: 0 
    },
    images: [{ 
        type: String
    }],
    ratings: [{
        userId: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'User'
        },
        rating: { 
            type: Number, 
            required: true, 
            min: 1, 
            max: 5 
        },
        comment: { 
            type: String 
        }
    }],
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
