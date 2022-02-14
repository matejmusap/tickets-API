import { NextFunction, Request, Response } from 'express';
import { DateTime } from 'luxon';
import * as queries from '../../database';

const cancelTicket = async (req: Request, res: Response, _next: NextFunction) => {
    try {
        const transactionID = +req.params.transactionID;
        const end = DateTime.now();
        const start = DateTime.fromISO(
            (await queries.transactionsQueries.getDepartureTime(transactionID)) as string
        );
        const diff =
            Math.floor(end.diff(start, ['hours']).toObject().hours as number) > 1 ? true : false;
        if (!diff) {
            return res.status(400).send({
                data: {},
                code: 400,
                message: 'You can cancel ticket minimum one hour before!'
            });
        }
        await queries.transactionsQueries.cancelTransaction(transactionID);
        return res.status(200).send({
            data: {},
            code: 200,
            message: 'Ticket is canceled!'
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

export default cancelTicket;
