const recipesService = require('../services/recipesService');
const { HOST, PORT } = process.env;

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
    const { id } = req.params;

    try {
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
        const { user } = req;
        const { id } = req.params;

        const recipeDeleted = await recipesService.deleteRecipeService(id, user);

        return res.status(204).json(recipeDeleted);
    } catch (err) {
        return next(err);
    }
};

const insertImageRecipeController = async (req, res, next) => {
    try {
        const image = `${ HOST || 'localhost' }:${ PORT || 3000 }/src/uploads/${ req.file.filename }`;

        const imageInserted = await recipesService.insertImageRecipeService(req.params.id, image);

        return res.status(200).json(imageInserted);
    } catch (err) {
        return next(err);
    }
};

const getImageRecipeController = async (req, res, next) => {
    const idRecipe = req.params.id.replace('.jpeg', '')

    try {
        const image = await recipesService.getImageRecipeService(idRecipe);

        return res.status(200).sendFile(image);
    } catch (err) {
        return next(err);
    }
}

module.exports = {
    createRecipeController,
    getRecipesController,
    getRecipeIdController,
    updateRecipeController,
    deleteRecipeController,
    insertImageRecipeController,
    getImageRecipeController
};