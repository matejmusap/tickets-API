import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import * as queries from '../database';

const authenticate = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split('Bearer ')[1];
    if (!token) {
        return res.status(401).send({
            data: {},
            code: 401,
            message: 'Invalid or no token provided.'
        });
    }
    try {
        const decodedToken = jwt.verify(token, process.env.SECRET_KEY as string, {
            complete: true
        }) as jwt.Jwt;
        if (
            decodedToken.payload.data.temoporaryToken &&
            decodedToken.payload.data.temoporaryToken === true
        ) {
            return res.status(401).send({
                data: {},
                code: 401,
                message: 'This token is temporary!.'
            });
        }
        const user = await queries.userQueries.getUserIDById(decodedToken.payload.data.id);
        if (!user) {
            return res.status(401).send({
                data: {},
                code: 401,
                message: 'No User with provided token!'
            });
        }
        req.user = decodedToken.payload.data;
        return next();
    } catch (err) {
        return next(err);
    }
};

export default authenticate;
