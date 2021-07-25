const orderModel = require("../models/order/order.model");

exports.listAll = (request, response, next) => {

    try{
        const page = request.query.page;
        const limit = request.query.limit;

        let skip = limit * (page - 1);     

        delete request.query.page;
        delete request.query.limit;

        const orders = await orderModel.find(request.query).skip(skip).limit(limit);
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

exports.getById = (request, response, next) => {
    try{
        return response.status(200).send({ orders });  
    }catch(e){
        console.log(e);
        return response.status(500).send({ message: "Internal error when try recovered datas!" });
    }
}

exports.create = (request, response, next) => {
    try{
        return response.status(200).send({ orders });  
    }catch(e){
        console.log(e);
        return response.status(500).send({ message: "Internal error when try recovered datas!" });
    }
}


exports.update = (request, response, next) => {
    try{
        return response.status(200).send({ orders });  
    }catch(e){
        console.log(e);
        return response.status(500).send({ message: "Internal error when try recovered datas!" });
    }
}

exports.delete = (request, response, next) => {
    try{
        return response.status(200).send({ orders });  
    }catch(e){
        console.log(e);
        return response.status(500).send({ message: "Internal error when try recovered datas!" });
    }
}