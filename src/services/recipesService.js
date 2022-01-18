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

// const getRecipesService = async () => {
//     const recipes = await recipesModel.getRecipesModel();
//     if (recipes.length === 0) {
//         throw errorConstructor(unprocessableEntity, 'List recipes empty');
//     }

//     return recipes;
// };

// const getRecipeIdService = async (id) => {
//     const recipe = await recipesModel.getRecipeIdModel(id);

//     if (!recipe) {
//         throw errorConstructor(notFound, 'Recipe not found');
//     }

//     return recipe;
// };

// const updateRecipeService = async (id, itensSold) => {
//     const exists = await recipesModel.getRecipeIdModel(id);
//     if (!exists) {
//         throw errorConstructor(unprocessableEntity, 'Recipe not exists');
//     }

//     verifyQuantityArrayUsers(itensSold);

//     if (itensSold === [] || itensSold === undefined) {
//         throw errorConstructor(unprocessableEntity, 'Wrong user ID or invalid quantity');
//     }

//     const { userId, quantity } = itensSold[0];
//     const updatedRecipe = await recipesModel.updateRecipeModel(id, userId, quantity);

//     return updatedRecipe;
// };

// const deleteRecipeService = async (id) => {
//     const searchRecipe = await recipesModel.getRecipeIdModel(id);
//     if (!searchRecipe) {
//         throw errorConstructor(unprocessableEntity, 'Wrong recipe ID format');
//     }

//     const deletedRecipe = await recipesModel.deleteRecipeModel(id, searchRecipe.itensSold);
//     if (deletedRecipe) { throw errorConstructor(unprocessableEntity, 'Recipe not deleted'); }

//     return searchRecipe;
// };

module.exports = {
    createRecipeService,
    // getRecipesService,
    // getRecipeIdService,
    // updateRecipeService,
    // deleteRecipeService,
};
