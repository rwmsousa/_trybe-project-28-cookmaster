const errorHandler = (err, req, res, _next) => {
    const { message } = err;
    
    if (err.status) {
        return res.status(err.status).json({ message });
    }
    return res.status(500).json({ message: 'Internal Server Error' });
};

module.exports = errorHandler;
