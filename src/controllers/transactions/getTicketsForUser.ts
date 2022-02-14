import { NextFunction, Request, Response } from 'express';
import * as queries from '../../database';

const getTicketsForUser = async (req: Request, res: Response, _next: NextFunction) => {
    try {
        const user = req.user;
        const transactions = await queries.transactionsQueries.getTicketsForUser(user.id);
        return res.status(200).send({
            data: { transactions },
            code: 200,
            message: 'Tickets bought by one user!'
        });
    } catch (e) {
        console.log(e);
        return res.status(400).send({
            data: {},
            code: 400,
            message: 'Something happened on getting tickets for user!'
        });
    }
};

export default getTicketsForUser;
