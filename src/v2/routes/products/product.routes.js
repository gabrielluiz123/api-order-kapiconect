const express = require("express");
const router = express.Router();


const login = require('../../middleware/login.middleware');
const productController = require('../../controllers/product.controller');
const productPriceController = require('../../controllers/product-price.controller');
const productStockController = require('../../controllers/product-stock.controller');


router.get('/product', login, productController.listAll);
router.get('/stock', login, productStockController.listStock);
router.patch('/stock/:id', login, productStockController.updateStock);
router.get('/price', login, productPriceController.listPrice);
router.patch('/price/:id', login, productPriceController.updatePrice);
router.get('/product/:id', login, productController.getById);
router.post('/product', login, productController.create);
router.patch('/product/:id', login, productController.update);
router.delete('/product/:id', login, productController.delete);


module.exports = router;