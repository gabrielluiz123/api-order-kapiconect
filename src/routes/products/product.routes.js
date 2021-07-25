const express = require("express");
const router = express.Router();


const login = require('../middleware/login.middleware');
const productController = require('../../controllers/product.controller');


router.get('/product', login, productController);
router.get('/product/:id', login, productController);
router.post('/product', login, productController);
router.patch('/product/:id', login, productController);
router.delete('/product/:id', login, productController);


module.exports = router;