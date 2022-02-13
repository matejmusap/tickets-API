import { body } from 'express-validator';

const register = [
    body('email', 'No email in body!').exists({ checkFalsy: true }),
    body('email', 'email is not email!').isEmail(),
    body('email', 'Username cannot be empty!').notEmpty(),
    body('username', 'No username in body!').exists({ checkFalsy: true }),
    body('username', 'username is not string!').isString(),
    body('username', 'username cannot be empty!').notEmpty(),
    body('password', 'No password in body!').exists({ checkFalsy: true }),
    body('password', 'password is not string!').isString(),
    body('password', 'password cannot be empty!').notEmpty(),
    body('card_number', 'No card_number in body!').exists({ checkFalsy: true }),
    body('card_number', 'card_number is not string!').isString(),
    body('card_number', 'card_number cannot be empty!').notEmpty(),
    body('card_number', 'card_number field must be 12 character long ').isLength({
        min: 12,
        max: 12
    })
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
