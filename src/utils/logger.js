const { createLogger, transports, format } = require("winston")

const transport = {
    console: new transports.Console(),
    file: new transports.File({filename: './logs/error.log', level: 'error'})
};

const {combine, timestamp, prettyPrint, errors, json} = format;

const logger = createLogger({
    format: combine(
        errors({stack: true}),
        timestamp(),
        prettyPrint(),
        json()
    ),
    transports: [
        transport.console,
        transport.file
    ]
})

module.exports = logger