import { NextFunction, Request, Response } from 'express';
import { DateTime } from 'luxon';
import * as queries from '../../database';

const cancelTicket = async (req: Request, res: Response, _next: NextFunction) => {
    try {
        const code = req.params.code;
        const now = DateTime.now();
        const departure = DateTime.fromSQL(
            (await queries.transactionsQueries.getDepartureTime(code)) as string
        );
        console.log(departure);
        const diff =
            Math.floor(departure.diff(now, ['hours']).toObject().hours as number) > 1
                ? true
                : false;
        if (!diff) {
            return res.status(400).send({
                data: {},
                code: 400,
                message: 'You can cancel ticket minimum one hour before!'
            });
        }
        await queries.transactionsQueries.cancelTransaction(code);
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
            message: 'Something happened on canceling ticket!'
        });
    }
};

export default cancelTicket;
