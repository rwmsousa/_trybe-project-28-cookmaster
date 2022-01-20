const Joi = require('joi');
const usersModel = require('../models/usersModel');
const errorConstructor = require('../utils/errorConstructor');

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

// const getUsersService = async () => {
//     const users = await usersModel.getUsersModel();

//     return users;
// };

// const getUserIdService = async (id) => {
//     const user = await usersModel.getUserIdModel(id);
//     if (!user) {
//         throw errorConstructor(unprocessableEntity, 'Wrong id format');
//     }

//     return user;
// };

// const updateUserService = async (id, name, quantity) => {

//     const { error } = userSchema.validate({ name, quantity });
//     if (error || !id) { throw errorConstructor(unprocessableEntity, error.details[0].message); }

//     const exists = await usersModel.getUserIdModel(id);
//     if (!exists) { throw errorConstructor(unprocessableEntity, 'User not exists'); }

//     const updatedUser = await usersModel.updateUserModel(id, name, quantity);

//     return updatedUser;
// };

// const deleteUserService = async (id) => {
//     const searchUser = await usersModel.getUserIdModel(id);

//     if (!searchUser) {
//         throw errorConstructor(unprocessableEntity, 'Wrong id format');
//     }

//     const { deletedCount } = await usersModel.deleteUserModel(id);

//     if (deletedCount === 0) { throw errorConstructor(unprocessableEntity, 'Wrong id format'); }

//     return searchUser;
// };

module.exports = {
    createUserService,
    loginService,
    // getUsersService,
    // getUserIdService,
    // updateUserService,
    // deleteUserService,
};
