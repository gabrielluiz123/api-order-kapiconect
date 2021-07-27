const express = require("express");
const router = express.Router();


const login = require('../../middleware/login.middleware');
const productController = require('../../controllers/product.controller');


router.get('/product', login, productController.listAll);
router.get('/stock', login, productController.listStock);
router.patch('/stock/:id', login, productController.updateStock);
router.get('/price', login, productController.listPrice);
router.patch('/price/:id', login, productController.updatePrice);
router.get('/product/:id', login, productController.getById);
router.post('/product', login, productController.create);
router.patch('/product/:id', login, productController.update);
router.delete('/product/:id', login, productController.delete);


module.exports = router;