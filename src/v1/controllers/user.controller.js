const jwt = require("jsonwebtoken");
require("dotenv").config();
const mongoService = require("../services/mongo.service");
const userModel = require("../../models/user.model");
const logger = require("../../utils/logger");


exports.login = async (request, response, next) => {
    try{
        const user = await mongoService.getUser({ username: request.body.username, password: request.body.password }, userModel);
        if (user) {
            const token = jwt.sign({
                user: request.body.username,
            }, process.env.JWT_KEY, {
                expiresIn: "4h",
            });

            return response.status(200).send({ message: "Successufuly Authorized!", token: token });
        }

        return response.status(401).send({ message: "Unauthorized!" });
    }catch(e){
        logger.error(e);
        return response.status(500).send({ message: "Error on Authorization!" });
    }
}

exports.register = async (request, response, next) => {
    try{
        const body = {
            username: request.body.username,
            password: request.body.password,
            email: request.body.username
        };

        const user = await mongoService.post(body, userModel);

        return response.status(201).send({ message: "User Registered!", user });
    }catch(e){
        logger.error(e);
        return response.status(500).send({ message: "Error on create User!"});
    }
}

exports.list = async (request, response, next) => {
    try{
        const page = parseInt(request.query.page || 1);
        const limit = parseInt(request.query.limit || 50);
        let skip = limit * (page - 1);  

        const users = await mongoService.get({}, skip, limit, userModel);

        const count = await userModel.countDocuments();
        const pageNumber = Math.ceil(count/parseInt(limit));
        const hasMorePages = pageNumber > page;

        return response.status(200).send({ users, hasMorePages, totalPages: pageNumber });
    }catch(e){
        logger.error(e);
        return response.status(500).send({ message: "Error on get Users!"});
    }
}

exports.getById = async (request, response, next) => {
    try{ 
        const id = request.params.id;
        const user = await mongoService.getById(id, userModel);
        if(!user) {
            return response.status(404).send({ message: "User not Found!" });
        }
        return response.status(200).send(user);
    }catch(e){
        logger.error(e);
        return response.status(500).send({ message: "Error on get User!"});
    }
}

exports.update = async (request, response, next) => {
    try{ 
        const id = request.params.id;
        const body = { username: request.body.username, email: request.body.username };
        const user = await mongoService.patch(body, id, userModel);
        if(!user) {
            return response.status(404).send({ message: "User not Found!" });
        }
        return response.status(200).send(user);
    }catch(e){
        logger.error(e);
        return response.status(500).send({ message: "Error on update User!"});
    }
}

exports.delete = async (request, response, next) => {
    try{ 
        const id = request.params.id;
        const user = await mongoService.delete(id, userModel);
        if(!user) {
            return response.status(404).send({ message: "User not Found!" });
        }
        return response.status(200).send(user);
    }catch(e){
        logger.error(e);
        return response.status(500).send({ message: "Error on delete User!"});
    }
}