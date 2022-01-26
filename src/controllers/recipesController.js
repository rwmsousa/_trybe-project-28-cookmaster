const recipesService = require('../services/recipesService');

const HOST = process.env.HOST || 'localhost'; // get HOST from .env file
const PORT = process.env.PORT || 3000; // get PORT from .env file

const createRecipeController = async (req, res, next) => {
    try {
        const recipeData = req.body;

        const { user } = req;

        const recipe = await recipesService.createRecipeService(recipeData, user);

        return res.status(201).json({ recipe });
    } catch (err) {
        return next(err);
    }
};

const getRecipesController = async (req, res, next) => {
    try {
        const recipes = await recipesService.getRecipesService();

        return res.status(200).json(recipes);
    } catch (err) {
        next(err);
    }
};

const getRecipeIdController = async (req, res, next) => {
    try {
        const { id } = req.params;
        
        const recipe = await recipesService.getRecipeIdService(id);
        
        return res.status(200).json(recipe);
    } catch (err) {
        next(err);
    }
};

const updateRecipeController = async (req, res, next) => {
    try {
        const { user } = req;
        const { id } = req.params;

        const updatedRecipe = await recipesService.updateRecipeService(user.email, id, req.body);

        return res.status(200).json(updatedRecipe);
    } catch (err) {
        return next(err);
    }
};

const deleteRecipeController = async (req, res, next) => {
    try {
        const { email } = req.user;
        const { id } = req.params;

        const recipeDeleted = await recipesService.deleteRecipeService(id, email);

        return res.status(204).json(recipeDeleted);
    } catch (err) {
        return next(err);
    }
};

const insertImageRecipeController = async (req, res, next) => {
    try {
        const image = `${HOST}:${PORT}/src/uploads/${req.file.filename}`;

        const imageInserted = await recipesService.insertImageRecipeService(req.params.id, image);

        return res.status(200).json(imageInserted);
    } catch (err) {
        return next(err);
    }
};

module.exports = {
    createRecipeController,
    getRecipesController,
    getRecipeIdController,
    updateRecipeController,
    deleteRecipeController,
    insertImageRecipeController,
};