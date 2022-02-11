import { NextFunction, Request, Response } from 'express';

const login = async (_req: Request, res: Response, _next: NextFunction) => {
    res.status(200).json({
        message: 'REGISTER'
    });
};

export default login;
