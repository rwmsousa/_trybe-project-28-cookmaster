const Joi = require('joi');
const recipesModel = require('../models/recipesModel');
const usersModel = require('../models/usersModel');
const errorConstructor = require('../utils/errorConstructor');
const { notFound, unprocessableEntity } = require('../utils/dictionary/statusCode');

const userSchema = Joi.object({
    quantity: Joi.number().min(1).required(),
});

const createRecipeService = async (itensSold) => {
    const verifyUsers = itensSold.some((recipe) =>
        usersModel.getUserIdModel(recipe.userId));

    if (!verifyUsers) {
        throw errorConstructor(unprocessableEntity, 'User not exists');
    }

    await verifyStock(itensSold);

    for (let index = 0; index < itensSold.length; index += 1) {
        const recipe = { quantity: itensSold[index].quantity };
        const { error } = userSchema.validate(recipe);
        if (error) {
            throw errorConstructor(unprocessableEntity, 'Wrong user ID or invalid quantity');
        }
    }

    const newRecipe = await recipesModel.createRecipeModel(itensSold);

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
