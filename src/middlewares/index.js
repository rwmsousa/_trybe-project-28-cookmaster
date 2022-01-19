const auth = require('./auth');
const multerMiddleware = require('./multerMiddleware');
const errorHandler = require('./errorHandler');

module.exports = {
    auth,
    multerMiddleware,
    errorHandler,
};