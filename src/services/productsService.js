const Joi = require('joi');
const usersModel = require('../models/usersModel');
const errorConstructor = require('../utils/errorConstructor');
const { unprocessableEntity } = require('../utils/dictionary/statusCode');

const userSchema = Joi.object({
    name: Joi.string().min(5).required(),
    quantity: Joi.number().min(1).required(),
});

const createUserService = async (name, quantity) => {
    const { error } = userSchema.validate({ name, quantity });
    if (error) { throw errorConstructor(unprocessableEntity, error.details[0].message); }

    const exists = await usersModel.existsVerifyName(name);
    if (exists) { throw errorConstructor(unprocessableEntity, 'User already exists'); }

    const newUser = await usersModel.createUserModel(name, quantity);

    return newUser;
};

const getUsersService = async () => {
    const users = await usersModel.getUsersModel();

    return users;
};

const getUserIdService = async (id) => {
    const user = await usersModel.getUserIdModel(id);
    if (!user) {
        throw errorConstructor(unprocessableEntity, 'Wrong id format');
    }

    return user;
};

const updateUserService = async (id, name, quantity) => {
    const { error } = userSchema.validate({ name, quantity });
    if (error || !id) { throw errorConstructor(unprocessableEntity, error.details[0].message); }

    const exists = await usersModel.getUserIdModel(id);
    if (!exists) { throw errorConstructor(unprocessableEntity, 'User not exists'); }

    const updatedUser = await usersModel.updateUserModel(id, name, quantity);

    return updatedUser;
};

const deleteUserService = async (id) => {
    const searchUser = await usersModel.getUserIdModel(id);
    if (!searchUser) {
        throw errorConstructor(unprocessableEntity, 'Wrong id format');
    }

    const { deletedCount } = await usersModel.deleteUserModel(id);

    if (deletedCount === 0) { throw errorConstructor(unprocessableEntity, 'Wrong id format'); }

    return searchUser;
};

module.exports = {
    createUserService,
    getUsersService,
    getUserIdService,
    updateUserService,
    deleteUserService,
};
