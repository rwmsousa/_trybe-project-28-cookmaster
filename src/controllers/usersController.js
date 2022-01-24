const usersService = require('../services/usersService'); // import usersService

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

const createAdminController = async (req, res, next) => {
    try {

        const token = req.headers.authorization;
        console.log('token', token);

        await usersService.verifyAdminService(token);
        const { name, email, password } = req.body;

        const user = await usersService.createUserService({ email, password, name, role: 'admin' });

        return res.status(201).json({ user });

    } catch (err) {
        return next(err);
    }
}

const loginController = async (req, res, next) => {
    try {
        const token = await usersService.loginService(req.body);

        return res.status(200).json({ token });

    } catch (err) {
        return next(err);
    }
};

module.exports = {
    createUserController,
    loginController,
    createAdminController,
};