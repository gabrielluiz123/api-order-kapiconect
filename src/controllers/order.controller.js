const orderModel = require("../models/order.model");
const mongoService = require("../services/mongo.service");
const moment = require("moment");

exports.listAll = async (request, response, next)  =>  {
    try{
        const page = parseInt(request.query.page ? request.query.page : 1);
        const limit = parseInt(request.query.limit ? request.query.limit : 50);
        let skip = limit * (page - 1);     
        console.log(fasduih)
        delete request.query.page;
        delete request.query.limit;

        let orders = await mongoService.get(request.query, skip, limit, orderModel);
        if (orders.length < 1) {
            return response.status(204).send({ message: "No orders to return" });     
        }

        const count = await orderModel.count(request.query);

        const pageNumber = Math.ceil(count/parseInt(limit));
        const hasMorePages = pageNumber > page;

        return response.status(200).send({ orders, totalPages: pageNumber, hasMorePages });     
    }catch(e){
        console.log(e);
        return response.status(500).send({ message: "Internal error when try recovered datas!" });
    }
}

exports.getById = async (request, response, next) => {
    try{
        const id = request.params.id;
        const order = await mongoService.getById(id, orderModel);
        if(order.length < 1){
            return response.status(404).send({ message: "Order not Found!" }); 
        }
        return response.status(200).send({ order });  
    }catch(e){
        console.log(e);
        return response.status(500).send({ message: "Internal error when try recovered datas!" });
    }
}

exports.create = async (request, response, next) => {
    try{
        const createdAt = moment();
        const body = request.body;
        body.created_at = createdAt;
        body.updated_at = createdAt;

        const order = await mongoService.post(body, orderModel);
        return response.status(201).send({ order });
    }catch(e){
        console.log(e);
        return response.status(500).send({ message: "Internal error when try recovered datas!" });
    }
}


exports.update = async (request, response, next) => {
    try{
        const updatedAt = moment();
        const id = request.params.id;
        const body = request.body;
        body.updated_at = updatedAt;
        const order = await mongoService.patch(body, id, orderModel);
        return response.status(200).send({ order });  
    }catch(e){
        console.log(e);
        return response.status(500).send({ message: "Internal error when try recovered datas!" });
    }
}

exports.delete = async (request, response, next) => {
    try{
        const id = request.params.id;

        const order = await mongoService.delete(id, orderModel);
        return response.status(200).send({ order });  
    }catch(e){
        console.log(e);
        return response.status(500).send({ message: "Internal error when try recovered datas!" });
    }
}