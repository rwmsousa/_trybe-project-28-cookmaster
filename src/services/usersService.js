const Joi = require('joi');
const jwt = require('jsonwebtoken'); // import jwt module from nodejs
const usersModel = require('../models/usersModel');
const errorConstructor = require('../utils/errorConstructor');
// const { JWT_SECRET } = process.env; // import JWT_SECRET from .env file
const JWT_SECRET = 'secret'; 

const userSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().regex(/\S+@\S+\.\S+/).required(),
    password: Joi.string().required(),
});

const createUserService = async (user) => {
    const { email, password, name } = user;

    const { error } = userSchema.validate({ email, password, name });
    if (error) { throw errorConstructor(400, 'Invalid entries. Try again.'); }

    const userExists = await usersModel.findUserByEmailModel(email);
    if (userExists) { throw errorConstructor(409, 'Email already registered'); }

    const newUser = await usersModel.createUserModel(user);

    return newUser;
};

const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});

const loginService = async (login) => {
    const { error } = loginSchema.validate(login);
    if (error) { throw errorConstructor(401, 'All fields must be filled'); }

    const token = await usersModel.tokenGenerateModel(login);
    if (!token) { throw errorConstructor(401, 'Incorrect username or password'); }

    return token;
};

const verifyAdminService = async (token) => {
    const decoded = jwt.verify(token, JWT_SECRET);

    if (decoded.role !== 'admin') {
        throw errorConstructor(403, 'Only admins can register new admins');
    }
};

module.exports = {
    createUserService,
    loginService,
    verifyAdminService,
};
