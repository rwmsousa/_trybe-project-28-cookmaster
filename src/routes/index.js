const express = require('express');

const auth = require('../middlewares/auth');

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

module.exports = router;
