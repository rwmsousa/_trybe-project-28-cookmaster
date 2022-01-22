const express = require('express'); // import express module
require('dotenv').config(); // import dotenv to use .env file
const bodyParser = require('body-parser'); // import body-parser to parse the body of the request
const path = require('path'); // import path from nodejs
const { errorHandler } = require('../middlewares'); // import errorHandler - middleware of error

const app = express(); // create an instance of express
const router = require('../routes'); // import router from routes

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // use body-parser to parse the body of the request

// DON`T REMOVE THIS ENDPOINT. NECESSARY FOR AVALIATOR TRYBE
app.get('/', (request, response) => {
    response.send();
});

app.use(express.json()); // use express.json() to parse the body of the request
app.use(router); // use router
app.use('/images', express.static(path.resolve(__dirname, '..', 'uploads'))); // use express.static to serve the images
app.use(errorHandler); // use errorHandler

module.exports = app; // export app