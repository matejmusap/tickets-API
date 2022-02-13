import { Request, Response, NextFunction } from 'express';
import * as queries from '../database';

const checkTransactionOwner = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = req.user;
        const transactionID = req.params.transactionID;
        const checkIsUserOwner = await queries.transactionQueries.checkIsUserOwner(
            user.id,
            transactionID
        );
        if (!checkIsUserOwner) {
            return res.status(401).send({
                data: {},
                code: 401,
                message: 'user is not owner of transaction!'
            });
        }
        return next();
    } catch (err) {
        return next(err);
    }
};

export default checkTransactionOwner;
