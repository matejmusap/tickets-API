import { body } from 'express-validator';

const register = [
    body('email', 'No email in body!').exists({ checkFalsy: true }),
    body('email', 'email is not email!').isEmail(),
    body('email', 'Username cannot be empty!').notEmpty(),
    body('password', 'No password in body!').exists({ checkFalsy: true }),
    body('password', 'password is not string!').isString(),
    body('password', 'password cannot be empty!').notEmpty()
];

const login = [
    body('email', 'No email in body!').exists({ checkFalsy: true }),
    body('email', 'email is not email!').isEmail(),
    body('email', 'Username cannot be empty!').notEmpty(),
    body('password', 'No password in body!').exists({ checkFalsy: true }),
    body('password', 'password is not string!').isString(),
    body('password', 'password cannot be empty!').notEmpty()
];

export { register, login };
