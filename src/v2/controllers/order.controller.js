const orderModel = require("../../models/order.model");
const productModel = require("../../models/product.model");
const mongoService = require("../services/mongo.service");
const logger = require("../utils/logger");

exports.listAll = async (request, response, next)  =>  {
    try{
        const page = parseInt(request.query.page || 1);
        const limit = parseInt(request.query.limit || 50);
        let skip = limit * (page - 1);   

        const query = { status: request.query.status };

        let orders = await mongoService.get(query, skip, limit, orderModel);
        if (orders.length < 1) {
            return response.status(204).send({ message: "No orders to return" });     
        }

        const count = await orderModel.countDocuments(request.query);

        const pageNumber = Math.ceil(count/parseInt(limit));
        const hasMorePages = pageNumber > page;

        return response.status(200).send({ orders, totalPages: pageNumber, hasMorePages });     
    } catch(e){
        logger.error(e);
        return response.status(500).send({ message: "Internal error when try recovered datas!" });
    }
}

exports.getById = async (request, response, next) => {
    try{
        const id = request.params.id;
        const order = await mongoService.getById(id, orderModel);
        if(!order){
            return response.status(404).send({ message: "Order not Found!" }); 
        }
        return response.status(200).send(order);  
    } catch(e){
        logger.error(e);
        return response.status(500).send({ message: "Internal error when try recovered data!" });
    }
}

exports.create = async (request, response, next) => {
    try{
        const body = request.body;

        const products = body.products;


        let hasStock = true;
        let productsUpdate = [];
        for(pct of products) {
            const product = await mongoService.getById(pct.product_id, productModel);
            if(product.available < pct.quantity) {   
                hasStock = false;
            }
            productsUpdate.push({ available: product.available, id: product._id, qty: pct.quantity });
        }

        if(!hasStock){
            return response.status(422).send({ message: "The order has unavailable products!" });
        }

        const order = await mongoService.post(body, orderModel);

        for(pct of productsUpdate) {
            const available = pct.available - pct.qty;
            await mongoService.patch({ available }, pct.id, productModel);
        }

        return response.status(201).send(order);
    }catch(e){
        logger.error(e);
        return response.status(500).send({ message: "Internal error when try create order!" });
    }
}


exports.update = async (request, response, next) => {
    try{
        const id = request.params.id;
        const body = { status: request.body.status };

        const order = await mongoService.patch(body, id, orderModel);
        return response.status(200).send(order);  
    } catch(e){
        logger.error(e);
        return response.status(500).send({ message: "Internal error when try update order!" });
    }
}

exports.delete = async (request, response, next) => {
    try{
        const id = request.params.id;

        const order = await mongoService.delete(id, orderModel);
        return response.status(200).send(order);  
    } catch(e){
        logger.error(e);
        return response.status(500).send({ message: "Internal error when try delete order!" });
    }
}