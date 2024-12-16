const express = require('express');
const router = express.Router();
const { Product, productSchema } = require('../models/product');
const validate = require('../middlewares/validate');

router.get('/socket', async (req, res, next) => {
    try {
        res.render("product");
    } catch (err) {
        next(err);
    }
});

router.get('/', async (req, res, next) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        next(err);
    }
});

router.post('/add', validate(productSchema), async (req, res, next) => {
    try {
        const product = new Product({
            name: req.body.name,
            price: req.body.price
        });
        await product.save();
        res.status(201).send("Product has been created");
    } catch (err) {
        next(err);
    }
});

router.delete('/deleteProduct/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        await Product.findByIdAndDelete(id);
        res.send('Product has been deleted');
    } catch (err) {
        next(err);
    }
});

router.put('/updateProduct/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const updatedProduct = await Product.findByIdAndUpdate(id, {
            name: req.body.name,
            price: req.body.price,
            material: req.body.material
        }, { new: true });
        res.json(updatedProduct);
    } catch (err) {
        next(err);
    }
});

router.get('/getProductByName/:name', async (req, res, next) => {
    try {
        const products = await Product.find({ name: req.params.name });
        res.json(products);
    } catch (err) {
        next(err);
    }
});

router.get('/averagePrice', async (req, res, next) => {
    try {
        const products = await Product.find({});
        let total = 0;
        products.forEach(product => total += product.price);
        const avgPrice = total / products.length;
        res.json({ averagePrice: avgPrice });
    } catch (err) {
        next(err);
    }
});

router.get('/aboveAveragePrice', async (req, res, next) => {
    try {
        const products = await Product.find({});
        let total = 0;
        products.forEach(product => total += product.price);
        const avgPrice = total / products.length;
        const aboveAvgProducts = products.filter(product => product.price > avgPrice);
        res.json(aboveAvgProducts);
    } catch (err) {
        next(err);
    }
});

module.exports = router;