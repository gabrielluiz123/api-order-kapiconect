const express = require("express");
const router = express.Router();

const login = require('../../middleware/login.middleware');
const userController = require("../../controllers/user.controller");

router.post('/login', userController.login);
router.post('/register', userController.register);
router.get('/user', login, userController.list);
router.get('/user/:id', login, userController.getById);
router.delete('/user/:id', login, userController.delete);
router.patch('/user/:id', login, userController.update);


module.exports = router;