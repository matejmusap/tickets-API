import { NextFunction, Request, Response } from 'express';
import * as queries from '../../database';

const getTickets = async (_req: Request, res: Response, _next: NextFunction) => {
    try {
        const tickets = await queries.ticketsQueries.getAllTickets();
        return res.status(200).send({
            data: { tickets },
            code: 200,
            message: 'List of tickets!'
        });
    } catch (e) {
        console.log(e);
        return res.status(400).send({
            data: {},
            code: 400,
            message: 'Something happened on Getting list of tickets!'
        });
    }
};

export default getTickets;
