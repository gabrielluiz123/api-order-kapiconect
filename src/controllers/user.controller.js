const jwt = require("jsonwebtoken");
require("dotenv").config();
const userService = require("../services/user.service");
const moment = require("moment");

exports.login = async (request, response, next) => {
    try{
        const user = await userService.get({ username: request.body.user, password: request.body.password });

        if (user) {
            const token = jwt.sign({
                user: request.body.user,
            }, process.env.JWT_KEY, {
                expiresIn: "4h",
            });

            return response.status(200).send({ message: "Successufuly Authorized!", token: token });
        }

        return response.status(401).send({ message: "Unauthorized!" });
    }catch(e){
        console.log(e);
        return response.status(500).send({ message: "Error on Authorization!" });
    }

    
}

exports.register = async (request, response, next) => {

    try{
        const createdAt = moment();
        const body = {
            username: request.body.username,
            password: request.body.password,
            email: request.body.username,
            created_at: createdAt,
            updated_at: createdAt
        };

        const user = await userService.post(body);

        return response.status(201).send({ message: "User Registered!", user });
    }catch(e){
        console.log(e);
        return response.status(500).send({ message: "Error on create User!", error: e.message });
    }
}