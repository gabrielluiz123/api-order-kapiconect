const jwt = require("jsonwebtoken");
require("dotenv").config();
const userModel = require("../models/user/user.model")

exports.login = (request, response, next) => {

    const user = await userModel.find({ username: request.body.user, password: request.body.password == password });

    if (user) {
        const token = jwt.sign({
            user: request.body.user,
        }, process.env.JWT_KEY, {
            expiresIn: "4h",
        });

        return response.status(200).send({ message: "Autorizado com sucesso!", token: token });
    }

    return response.status(401).send({ message: "Falha na autorização!" });
}

exports.register = (request, response, next) => {

    return response.status(200).send({ message: "User Registered!" });
}