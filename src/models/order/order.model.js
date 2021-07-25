const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const schema = new Schema({
    id: {
        type: String,
        required: true
    },
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
    user: {
        type: String,
        required: true
    },
    total: {
        type: Number,
        required: true
    },
    created_date: {
        type: Date,
        required: true
    },
    products: [
        {
            product_id: {
                type: String
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