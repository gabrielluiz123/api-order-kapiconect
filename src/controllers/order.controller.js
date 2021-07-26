const orderModel = require("../models/order/order.model");
const orderService = require("../services/order.service");
const moment = require("moment");

exports.listAll = async (request, response, next)  =>  {
    try{
        const page = request.query.page ? request.query.page : 0;
        const limit = request.query.limit ? request.query.limit : 50;

        let skip = limit * (page - 1);     

        delete request.query.page;
        delete request.query.limit;

        const orders = await orderService.get(request.query, skip, limit);
        if (orders.length < 1) {
            return response.status(204).send({ message: "No orders to return" });     
        }

        const count = orderModel.count(request.query);
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
        const order = await orderService.getById(id);
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

        const order = await orderService.post(body);
        return response.status(201).send({ order });
    }catch(e){
        console.log(e);
        return response.status(500).send({ message: "Internal error when try recovered datas!" });
    }
}


exports.update = async (request, response, next) => {
    try{
        const id = request.params.id;
        const body = request.body;

        const order = await orderService.patch(body, id);
        return response.status(200).send({ order });  
    }catch(e){
        console.log(e);
        return response.status(500).send({ message: "Internal error when try recovered datas!" });
    }
}

exports.delete = async (request, response, next) => {
    try{
        const id = request.params.id;

        const order = await orderService.delete(id);
        return response.status(200).send({ order });  
    }catch(e){
        console.log(e);
        return response.status(500).send({ message: "Internal error when try recovered datas!" });
    }
}