const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const rateLimiterUsingThirdParty  = require("./v1/middleware/rateLimiter.middleware");
const logMiddleware = require("./v1/middleware/log.middleware")

const routes = require("./v1/routes");
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());
app.use(logMiddleware);
app.use(rateLimiterUsingThirdParty());

app.use(routes);

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