import { NextFunction, Request, Response } from 'express';
import * as queries from '../../database';

const getTickets = async (_req: Request, res: Response, _next: NextFunction) => {
    try {
        return res.status(200).send({
            data: {},
            code: 200,
            message: 'Ticket is bought!'
        });
    } catch (e) {
        console.log(e);
        return res.status(400).send({
            data: {},
            code: 400,
            message: 'Something happened on buying ticket!'
        });
    }
};

export default getTickets;
