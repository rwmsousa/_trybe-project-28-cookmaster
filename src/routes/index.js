const express = require('express');
const {
    createUserController,
    // getUsersController,
    // getUserIdController,
    // updateUserController,
    // deleteUserController,
} = require('../controllers/usersController');

const {
    createRecipeController,
    // getRecipesController,
    // getRecipeIdController,
    // updateRecipeController,
    // deleteRecipeController,
} = require('../controllers/recipesController');

const router = express.Router();

// users
router.post('/users', createUserController);
// router.get('/users', getUsersController);
// router.get('/users/:id', getUserIdController);
// router.put('/users/:id', updateUserController);
// router.delete('/users/:id', deleteUserController);

// recipes
router.post('/recipes', createRecipeController);
// router.get('/recipes', getRecipesController);
// router.get('/recipes/:id', getRecipeIdController);
// router.put('/recipes/:id', updateRecipeController);
// router.delete('/recipes/:id', deleteRecipeController);

module.exports = router;
