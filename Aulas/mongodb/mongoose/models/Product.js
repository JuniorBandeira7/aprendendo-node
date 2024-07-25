const mongoose = require('mongoose')
const {Schema} = mongoose

const Product = mongoose.model(
    'Product',
    new Schema({
        name: {type: String, required: true},
        price: {type: Number, required: true},
        description: {type: String},
        image: {type: String}
    })
)

module.exports = Product

