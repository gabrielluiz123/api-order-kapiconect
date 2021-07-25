const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require('body-parser');

const routes = require("./routes");
const app = express();

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());

app.use(routes);

app.use((request, response, next) => {
    const erro = new Error('Não encontrado!');
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