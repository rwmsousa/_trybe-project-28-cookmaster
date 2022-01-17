const statusCode = (errStatus, errMessage) => {
    if (errStatus === 404
        && errMessage === 'Such amount is not permitted to sell') {
        return 'stock_problem';
    }

    if (errStatus === 404) {
        return 'not_found';
    }

    return 'invalid_data';
};

const errorHandler = (err, req, res, _next) => {
    if (err.status) {
        return res.status(err.status)
            .json({ err: { code: statusCode(err.status, err.message), message: err.message } });
    }
    return res.status(500).json({ message: 'Internal Server Error' });
};

module.exports = errorHandler;
