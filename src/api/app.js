const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const errorMiddleware = require('../middlewares/errorHandler');

const app = express();
const router = require('../routes');

app.use(bodyParser.json());

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
    response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.use(express.json());
app.use(router);
app.use(errorMiddleware);

module.exports = app;