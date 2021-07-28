const mongoose = require('mongoose');
require("dotenv").config();
const logger = require("../../utils/logger");


const uri = process.env.MONGO_URL;

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        logger.info(`🚀 MongoDB connected...!`);
    })
    .catch(err => console.log(err))

module.exports = mongoose.connection;