const express = require("express");

const ordersRoute = require("./orders/order.routes");
const usersRoute = require("./users/user.routes");
const productsRoute = require("./products/product.routes");



const routes = express.Router();

routes.use('/v1', productsRoute);
routes.use('/v1', ordersRoute);
routes.use('/v1', usersRoute);

module.exports = routes;