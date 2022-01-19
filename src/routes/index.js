const express = require('express');

const { auth, multerMiddleware } = require('../middlewares');

const {
    createUserController,
    loginController,
    // getUsersController,
    // getUserIdController,
    // updateUserController,
    // deleteUserController,
} = require('../controllers/usersController');

const {
    createRecipeController,
    getRecipesController,
    getRecipeIdController,
    updateRecipeController,
    deleteRecipeController,
    insertImageRecipeController,
} = require('../controllers/recipesController');

const router = express.Router();

// users
router.post('/users', createUserController);
router.post('/login', loginController);
// router.get('/users', getUsersController);
// router.get('/users/:id', getUserIdController);
// router.put('/users/:id', updateUserController);
// router.delete('/users/:id', deleteUserController);

// recipes
router.post('/recipes', auth, createRecipeController);
router.get('/recipes', getRecipesController);
router.get('/recipes/:id', getRecipeIdController);
router.put('/recipes/:id', auth, updateRecipeController);
router.delete('/recipes/:id', auth, deleteRecipeController);
router.put('/recipes/:id/image', auth, multerMiddleware, insertImageRecipeController);

module.exports = router;
