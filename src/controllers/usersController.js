const usersService = require('../services/usersService');

const createUserController = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        const role = 'user';
        
        const user = await usersService
            .createUserService({ email, password, name, role });

        return res.status(201).json({ user });
    } catch (err) {
        return next(err);
    }
};

const loginController = async (req, res, next) => {
    try {
        const token = await usersService.loginService(req.body);

        return res.status(200).json({ token });
    } catch (err) {
        return next(err);
    }
};

// const getUsersController = async (req, res, next) => {
//     try {
//         const users = await usersService.getUsersService();
//         return res.status(success).json({ users });
//     } catch (err) {
//         next(err);
//     }
// };

// const getUserIdController = async (req, res, next) => {
//     const { id } = req.params;

//     try {
//         const user = await usersService.getUserIdService(id);
//         return res.status(success).json(user);
//     } catch (err) {
//         next(err);
//     }
// };

// const updateUserController = async (req, res, next) => {
//     try {
//         const { name, quantity } = req.body;
//         const { id } = req.params;

//         const updatedUser = await usersService.updateUserService(id, name, quantity);

//         return res.status(success).json(updatedUser);
//     } catch (err) {
//         return next(err);
//     }
// };

// const deleteUserController = async (req, res, next) => {
//     const { id } = req.params;

//     try {
//         const deleteUser = await usersService.deleteUserService(id);
//         return res.status(success).json(deleteUser);
//     } catch (err) {
//         return next(err);
//     }
// };

module.exports = {
    createUserController,
    loginController,

    // getUsersController,
    // getUserIdController,
    // updateUserController,
    // deleteUserController,
};