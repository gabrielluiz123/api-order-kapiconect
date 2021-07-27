const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const schema = new Schema({
    order_number: {
        type: String,
        required: true
    },
    billing_address: {
        type: String,
        required: true
    },
    shipping_address: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['openned', 'invoiced', 'separation', 'canceled', 'closed'],
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    total: {
        type: Number,
        required: true
    },
    created_at: {
        type: Date,
        required: true
    },
    updated_at: {
        type: Date,
        required: true
    },
    products: [
        {
            product_id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product'
            },
            quantity: {
                type: Number
            },
            unity_price: {
                type: Number
            },
        }
    ]
});

module.exports = mongoose.model('Order', schema);