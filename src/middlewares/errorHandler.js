const errorHandler = (err, req, res, _next) => {
    const { message } = err;
    if (err.status) {
        console.log('ERROR HANDLER',err.message)
        return res.status(err.status)
            .json({ message });
    }
    console.log('ERROR HANDLER 2', err.message);
    return res.status(500).json({ message: 'Internal Server Error' });
};

module.exports = errorHandler;
