const {check} = require("express-validator");
const User = require("../models/User");

exports.registrationsValidators = [
    check('email')
        .isEmail()
        .withMessage('Uncorrect email')
        .custom(async (value) => {
            try {
                const user = await User.findOne({email: value});
                if (user) {
                    return Promise.reject(`Пользователь с email: ${value} уже существует`);
                }
            } catch (e) {
                console.log(e);
            }
        }),

    check('password')
        .isLength({min: 3, max: 20})
        .withMessage('Password must be longer than 3 and shorter than 20')
        .isAlphanumeric()
        .withMessage('В пароле можно использовать только латиницу'),

    check('repeatPassword').custom((value, {req}) => {
        if (value !== req.body.password) {
            throw new Error('Пароли должны совпадать');
        }
        return true;
    }),
    check('name')
        .isLength({min: 3})
        .withMessage('Имя должно быть минимум 3 символа'),
]