const productModel = require("../../models/product.model");
const mongoService = require("../services/mongo.service");
const logger = require("../../utils/logger");

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

        const count = await productModel.countDocuments(query);

        const pageNumber = Math.ceil(count/parseInt(limit));
        const hasMorePages = pageNumber > page;

        return response.status(200).send({ prices, totalPages: pageNumber, hasMorePages });     
    }catch(e){
        logger.error(e);
        return response.status(500).send({ message: "Internal error when try recovered datas!" });
    }
}

exports.updatePrice = async (request, response, next) => {
    try{
        const id = request.params.id;
        const price = request.body.price;
        if(price < 0) {
            return response.status(422).send({ message: "Price less than 0!" });
        }
        const body = { price };

        const product = await mongoService.patch(body, id, productModel);
        return response.status(200).send(product);  
    }catch(e){
        logger.error(e);
        return response.status(500).send({ message: "Internal error when try to update price!" });
    }
}