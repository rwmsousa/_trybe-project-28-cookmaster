const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;

module.exports = async (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        const err = new Error('missing auth token');
        err.status = 401;
        
        return next(err);
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        
        return next();
    } catch (err) {
        err.status = 401;
        return next(err);
    }
};