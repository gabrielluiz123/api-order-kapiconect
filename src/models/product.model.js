const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const schema = new Schema({
    sku: {
        type: String,
        required: true
    },
    ean: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    available: {
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
});

module.exports = mongoose.model('Product', schema);