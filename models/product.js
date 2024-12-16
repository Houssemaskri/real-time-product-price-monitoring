const mongoose = require("mongoose");
const yup = require('yup');

const product = new mongoose.Schema({
    name: String,
    price: Number,
    material: String
});

const Product = mongoose.model("products", product);

const productSchema = yup.object({
    body: yup.object({
        name: yup.string().min(3).max(15).required(),
        price: yup.number().required()
    })
});

module.exports = {Product,productSchema};
