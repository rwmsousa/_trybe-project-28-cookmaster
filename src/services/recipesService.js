const Joi = require('joi');
const recipesModel = require('../models/recipesModel');
const usersModel = require('../models/usersModel');
const errorConstructor = require('../utils/errorConstructor');

const recipeSchema = Joi.object({
    name: Joi.string().required(),
    ingredients: Joi.string().required(),
    preparation: Joi.string().required(),
});

const createRecipeService = async (recipeData, user) => {
    const { error } = recipeSchema.validate(recipeData);
    if (error) { throw errorConstructor(400, 'Invalid entries. Try again.'); }

    const verifyUsers = await usersModel.findUserByEmailModel(user.email);
    if (!verifyUsers) { throw errorConstructor(422, 'User not exists'); }

    const newRecipe = await recipesModel.createRecipeModel(recipeData, user);

    return newRecipe;
};

const getRecipesService = async () => {
    const recipes = await recipesModel.getRecipesModel();

    if (recipes.length === 0) {
        throw errorConstructor(422, 'List recipes empty');
    }

    return recipes;
};

const getRecipeIdService = async (id) => {
    const recipe = await recipesModel.getRecipeIdModel(id);

    if (!recipe) {
        throw errorConstructor(404, 'recipe not found');
    }

    return recipe;
};

const updateRecipeService = async (userEmail, idRecipe, changesRecipes) => {
    const exists = await recipesModel.getRecipeIdModel(idRecipe);
    if (!exists) { throw errorConstructor(422, 'Recipe not exists'); }

    const verifyUser = await usersModel.findUserByEmailModel(userEmail);
    if (!verifyUser) { throw errorConstructor(422, 'User not exists'); }

    const { _id } = verifyUser;
    const updatedRecipe = await recipesModel
        .updateRecipeModel(idRecipe, changesRecipes, _id);

    return updatedRecipe;
};

const deleteRecipeService = async (idRecipe, user) => {
    const exists = await recipesModel.getRecipeIdModel(idRecipe);
    if (!exists) { throw errorConstructor(422, 'Recipe not exists'); }

    const verifyUser = await usersModel.findUserByEmailModel(user.email);
    if (!verifyUser) { throw errorConstructor(422, 'User not exists'); }

    const recipeDeleted = await recipesModel.deleteRecipeModel(idRecipe);

    return recipeDeleted;
};

module.exports = {
    createRecipeService,
    getRecipesService,
    getRecipeIdService,
    updateRecipeService,
    deleteRecipeService,
};
