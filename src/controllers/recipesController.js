const recipesService = require('../services/recipesService');
const { created } = require('../utils/dictionary/statusCode');

const createRecipeController = async (req, res, next) => {
    try {
        const recipeData = req.body;
        const userId = req.user._id;

        const recipe = await recipesService.createRecipeService(recipeData, userId);

        return res.status(created).json({ recipe });

    } catch (err) {
        console.log('erro CONTROLLER', err)
        return next(err);
    }
};

// const getRecipesController = async (req, res, next) => {
//     try {
//         const recipes = await recipesService.getRecipesService();
//         return res.status(success).json({ recipes });
//     } catch (err) {
//         next(err);
//     }
// };

// const getRecipeIdController = async (req, res, next) => {
//     const { id } = req.params;

//     try {
//         const recipe = await recipesService.getRecipeIdService(id);
//         return res.status(success).json(recipe);
//     } catch (err) {
//         next(err);
//     }
// };

// const updateRecipeController = async (req, res, next) => {
//     try {
//         const itemsRecipes = req.body;
//         const { id } = req.params;

//         const updatedRecipe = await recipesService.updateRecipeService(id, itemsRecipes);

//         return res.status(success).json(updatedRecipe);
//     } catch (err) {
//         return next(err);
//     }
// };

// const deleteRecipeController = async (req, res, next) => {
//     const { id } = req.params;

//     try {
//         const deleteRecipe = await recipesService.deleteRecipeService(id);
//         return res.status(success).json(deleteRecipe);
//     } catch (err) {
//         return next(err);
//     }
// };

module.exports = {
    createRecipeController,
    // getRecipesController,
    // getRecipeIdController,
    // updateRecipeController,
    // deleteRecipeController,
};