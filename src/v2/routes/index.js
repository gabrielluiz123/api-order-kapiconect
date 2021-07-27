const express = require("express");

const ordersRoute = require("./orders/order.routes");
const usersRoute = require("./users/user.routes");
const productsRoute = require("./products/product.routes");



const routes = express.Router();

routes.use('/v2', productsRoute);
routes.use('/v2', ordersRoute);
routes.use('/v2', usersRoute);

module.exports = routes;