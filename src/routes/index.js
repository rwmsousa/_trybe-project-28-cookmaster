const express = require('express'); // import express module

const { auth, multerMiddleware } = require('../middlewares'); // import auth and multerMiddleware - middlewares

const {
    createUserController,
    loginController,
    createAdminController
} = require('../controllers/usersController'); // import usersController

const {
    createRecipeController,
    getRecipesController,
    getRecipeIdController,
    updateRecipeController,
    deleteRecipeController,
    insertImageRecipeController,
} = require('../controllers/recipesController'); // import recipesController

const router = express.Router(); // create an instance of express.Router()

// Routes for users
router.post('/users/admin', auth, createAdminController);
router.post('/users', createUserController);
router.post('/login', loginController);

// Routes for recipes
router.post('/recipes', auth, createRecipeController);
router.get('/recipes', getRecipesController);
router.get('/recipes/:id', getRecipeIdController);
router.put('/recipes/:id', auth, updateRecipeController);
router.delete('/recipes/:id', auth, deleteRecipeController);

// Route for images
router.put('/recipes/:id/image', auth, multerMiddleware, insertImageRecipeController);

module.exports = router; // export router
