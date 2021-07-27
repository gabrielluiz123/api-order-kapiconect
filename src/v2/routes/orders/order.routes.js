const express = require("express");
const router = express.Router();

const orderController = require('../../controllers/order.controller');
const login = require('../../middleware/login.middleware');

router.get('/order', login, orderController.listAll);
router.get('/order/:id', login, orderController.getById);
router.post('/order', login, orderController.create);
router.patch('/order/:id', login, orderController.update);
router.delete('/order/:id', login, orderController.delete);


module.exports = router;