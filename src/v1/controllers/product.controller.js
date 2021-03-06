const productModel = require("../../models/product.model");
const mongoService = require("../services/mongo.service");
const logger = require("../../utils/logger");

exports.listAll = async (request, response, next)  =>  {
    try{
        const page = parseInt(request.query.page || 1);
        const limit = parseInt(request.query.limit || 50);
        let skip = limit * (page - 1);    
        let query = {};
        if(request.query.sku) {
            query.sku = request.query.sku
        }

        if(request.query.ean) {
            query.ean = request.query.ean
        }

        const products = await mongoService.get(query, skip, limit, productModel);
        if (products.length < 1) {
            return response.status(204).send({ message: "No products to return" });     
        }

        const count = await productModel.countDocuments(query);
        const pageNumber = Math.ceil(count/parseInt(limit));
        const hasMorePages = pageNumber > page;

        return response.status(200).send({ products, totalPages: pageNumber, hasMorePages });     
    }catch(e){
        logger.error(e);
        return response.status(500).send({ message: "Internal error when try recovered datas!" });
    }
}

exports.getById = async (request, response, next) => {
    try{
        const id = request.params.id;
        const product = await mongoService.getById(id, productModel);
        if(!product){
            return response.status(404).send({ message: "product not Found!" }); 
        }
        return response.status(200).send(product);  
    }catch(e){
        logger.error(e);
        return response.status(500).send({ message: "Internal error when try recovered data!" });
    }
}

exports.create = async (request, response, next) => {
    try{
        const body = request.body;

        const price = request.body.price;
        const stock = request.body.available;
        if(price < 0 || stock < 0) {
            return response.status(422).send({ message: "Price or stock less than 0!" });
        }

        const product = await mongoService.post(body, productModel);
        return response.status(201).send({ product });
    }catch(e){
        logger.error(e);
        return response.status(500).send({ message: "Internal error when try create product!" });
    }
}


exports.update = async (request, response, next) => {
    try{
        const id = request.params.id;
        const body = request.body;

        const price = request.body.price ? request.body.price : 0;
        const stock = request.body.available ? request.body.available : 0;
        if(price < 0 || stock < 0) {
            return response.status(422).send({ message: "Price or stock less than 0!" });
        }

        const product = await mongoService.patch(body, id, productModel);
        if(!product) {
            return response.status(404).send({ message: "Product not Found!" });
        }
        return response.status(200).send({ product });  
    }catch(e){
        logger.error(e);
        return response.status(500).send({ message: "Internal error when try to update product!" });
    }
}

exports.delete = async (request, response, next) => {
    try{
        const id = request.params.id;

        const product = await mongoService.delete(id, productModel);
        if(!product) {
            return response.status(404).send({ message: "Product not Found!" });
        }
        return response.status(200).send(true);  
    }catch(e){
        logger.error(e);
        return response.status(500).send({ message: "Internal error when try to delete product!" });
    }
}