const productModel = require("../models/product.model");
const mongoService = require("../services/mongo.service");
const moment = require("moment");

exports.listAll = async (request, response, next)  =>  {
    try{
        const page = parseInt(request.query.page ? request.query.page : 1);
        const limit = parseInt(request.query.limit ? request.query.limit : 50);
        let skip = limit * (page - 1);     

        delete request.query.page;
        delete request.query.limit;

        const products = await mongoService.get(request.query, skip, limit, productModel);
        if (products.length < 1) {
            return response.status(204).send({ message: "No products to return" });     
        }

        const count = await productModel.count(request.query);

        const pageNumber = Math.ceil(count/parseInt(limit));
        const hasMorePages = pageNumber > page;

        return response.status(200).send({ products, totalPages: pageNumber, hasMorePages });     
    }catch(e){
        console.log(e);
        return response.status(500).send({ message: "Internal error when try recovered datas!" });
    }
}

exports.listStock = async (request, response, next)  =>  {
    try{
        const page = parseInt(request.query.page ? request.query.page : 1);
        const limit = parseInt(request.query.limit ? request.query.limit : 50);
        let skip = limit * (page - 1);     

        delete request.query.page;
        delete request.query.limit;

        const stocks = await mongoService.get(request.query, skip, limit, productModel);
        if (stocks.length < 1) {
            return response.status(204).send({ message: "No stocks to return" });     
        }

        const count = await productModel.count(request.query);

        const pageNumber = Math.ceil(count/parseInt(limit));
        const hasMorePages = pageNumber > page;

        return response.status(200).send({ stocks, totalPages: pageNumber, hasMorePages });     
    }catch(e){
        console.log(e);
        return response.status(500).send({ message: "Internal error when try recovered datas!" });
    }
}

exports.updateStock = async (request, response, next) => {
    try{
        const updatedAt = moment();

        const id = request.params.id;
        const available = request.body.available;
        if(available < 0) {
            return response.status(422).send({ message: "Stock less than 0!" });
        }
        const body = { available };
        body.updated_at = updatedAt;

        const stock = await mongoService.patch(body, id, productModel);
        return response.status(200).send({ stock });  
    }catch(e){
        console.log(e);
        return response.status(500).send({ message: "Internal error when try recovered datas!" });
    }
}

exports.listPrice = async (request, response, next)  =>  {
    try{
        const page = parseInt(request.query.page ? request.query.page : 1);
        const limit = parseInt(request.query.limit ? request.query.limit : 50);
        let skip = limit * (page - 1);     

        delete request.query.page;
        delete request.query.limit;

        const prices = await mongoService.get(request.query, skip, limit, productModel);
        if (prices.length < 1) {
            return response.status(204).send({ message: "No prices to return" });     
        }

        const count = await productModel.count(request.query);

        const pageNumber = Math.ceil(count/parseInt(limit));
        const hasMorePages = pageNumber > page;

        return response.status(200).send({ prices, totalPages: pageNumber, hasMorePages });     
    }catch(e){
        console.log(e);
        return response.status(500).send({ message: "Internal error when try recovered datas!" });
    }
}

exports.updatePrice = async (request, response, next) => {
    try{
        const updatedAt = moment();

        const id = request.params.id;
        const price = request.body.price;
        if(price < 0) {
            return response.status(422).send({ message: "Price less than 0!" });
        }
        const body = { price };
        body.updated_at = updatedAt;

        const product = await mongoService.patch(body, id, productModel);
        return response.status(200).send({ product });  
    }catch(e){
        console.log(e);
        return response.status(500).send({ message: "Internal error when try recovered datas!" });
    }
}

exports.getById = async (request, response, next) => {
    try{
        const id = request.params.id;
        const product = await mongoService.getById(id, productModel);
        if(product.length < 1){
            return response.status(404).send({ message: "product not Found!" }); 
        }
        return response.status(200).send({ product });  
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

        const product = await mongoService.post(body, productModel);
        return response.status(201).send({ product });
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

        const product = await mongoService.patch(body, id, productModel);
        return response.status(200).send({ product });  
    }catch(e){
        console.log(e);
        return response.status(500).send({ message: "Internal error when try recovered datas!" });
    }
}

exports.delete = async (request, response, next) => {
    try{
        const id = request.params.id;

        const product = await mongoService.delete(id, productModel);
        return response.status(200).send({ product });  
    }catch(e){
        console.log(e);
        return response.status(500).send({ message: "Internal error when try recovered datas!" });
    }
}