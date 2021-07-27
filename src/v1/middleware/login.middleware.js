const jwt = require('jsonwebtoken');
require("dotenv").config();

module.exports = (require, response, next) => {

    try {
        const token = require.headers.authorization.split(' ')[1];

        const decode = jwt.verify(token, process.env.JWT_KEY);
        require.user = decode;
        next();
    } catch (error) {
        return response.status(401).send({
            message: 'Unauthorized User!'
        });
    }
}