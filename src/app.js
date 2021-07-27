const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const rateLimiterUsingThirdParty  = require("./v1/middleware/rateLimiter.middleware");
const logMiddleware = require("./v1/middleware/log.middleware")

const routesV1 = require("./v1/routes");
const routesV2 = require("./v2/routes");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors({
  origin: ['https:/localhost', 'https://www.google.com/']
}));

app.use(logMiddleware);
app.use(rateLimiterUsingThirdParty());

app.use(routesV1);
app.use(routesV2);

app.use((error, request, response, next) => {
    logger.error(error)
    response.status(error.status || 500);
    return response.send({
        error: {
            mensagem: error.message
        },
    })
});

module.exports = app;