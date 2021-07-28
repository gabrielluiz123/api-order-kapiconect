const productModel = require("../../models/product.model");
const mongoService = require("../services/mongo.service");
const logger = require("../../utils/logger");

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

        const count = await productModel.countDocuments(query);

        const pageNumber = Math.ceil(count/parseInt(limit));
        const hasMorePages = pageNumber > page;

        return response.status(200).send({ stocks, totalPages: pageNumber, hasMorePages });     
    }catch(e){
        logger.error(e);
        return response.status(500).send({ message: "Internal error when try recovered datas!" });
    }
}

exports.updateStock = async (request, response, next) => {
    try{
        const id = request.params.id;
        const available = request.body.available;
        if(available < 0) {
            return response.status(422).send({ message: "Stock less than 0!" });
        }
        const body = { available };

        const stock = await mongoService.patch(body, id, productModel);
        return response.status(200).send(stock);  
    }catch(e){
        logger.error(e);
        return response.status(500).send({ message: "Internal error when try to update stock!" });
    }
}