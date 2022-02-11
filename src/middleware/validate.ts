import { NextFunction, Request, Response } from 'express';

import { validationResult } from 'express-validator';

// middleware that validates user input
const validate = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    } else {
        return next();
    }
};

export default validate;
