import { NextFunction, Request, Response } from 'express';
import * as queries from '../../database';

const buyTicket = async (req: Request, res: Response, _next: NextFunction) => {
    try {
        const user = req.user;
        const ticketID = +req.params.ticketID;
        const { card_number } = req.body;
        const checkCard = await queries.authQueries.checkCard(user.id, card_number);
        if (!checkCard) {
            return res.status(401).send({
                data: {},
                code: 401,
                message: 'Card is not valid or not belongs to user!'
            });
        }
        const checkAvailableSeats = await queries.ticketsQueries.getNumberOfSeats(ticketID);
        if (checkAvailableSeats > 0) {
            const transaction = await queries.transactionsQueries.createTransaction(
                user.id,
                'Bought',
                ticketID
            );
            await queries.ticketsQueries.decreaseNumberOfSeat(ticketID);
            return res.status(200).send({
                data: { transaction },
                code: 200,
                message: 'Ticket is bought!'
            });
        } else {
            await queries.transactionsQueries.createTransaction(user.id, 'Rejected', ticketID);
            return res.status(200).send({
                data: {},
                code: 200,
                message: 'Your transaction is rejected. No more free space in bus!'
            });
        }
    } catch (e) {
        console.log(e);
        return res.status(400).send({
            data: {},
            code: 400,
            message: 'Something happened on buying ticket!'
        });
    }
};

export default buyTicket;
