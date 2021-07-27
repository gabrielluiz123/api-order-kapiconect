const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

var winston = require('winston'); // for transports.Console
const bodyParser = require("body-parser");
const rateLimiterUsingThirdParty  = require("./middleware/rateLimiter.middleware");

const routes = require("./routes");
const app = express();

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());
app.use(rateLimiterUsingThirdParty());

app.use(routes);
var logger = new winston.createLogger({
    transports: [
        new winston.transports.File({
            level: 'error',
            filename: './logs/all-logs.log',
            handleExceptions: true,
            json: true,
            maxsize: 5242880, //5MB
            maxFiles: 5,
            colorize: false
        }),
        new winston.transports.Console({
            level: 'debug',
            handleExceptions: true,
            json: false,
            colorize: true
        })
    ],
    exitOnError: false
});

logger.stream = {
    write: function(message, encoding){
        logger.info(message);
    }
};

app.use(require("morgan")("combined", { "stream": logger.stream }));

app.use((request, response, next) => {
    const erro = new Error("Not Found!");
    erro.status = 404;
    next(erro);
});

app.use((error, request, response, next) => {
    response.status(error.status || 500);
    return response.send({
        error: {
            mensagem: error.message
        },
    })
});

module.exports = app;