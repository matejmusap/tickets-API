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
        const transaction = await queries.transactionQueries.createTransaction(
            user.id,
            card_number,
            ticketID
        );
        return res.status(200).send({
            data: { transaction },
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

export default buyTicket;
