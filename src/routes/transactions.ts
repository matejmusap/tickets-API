import express from 'express';

import * as transactionsSchemas from '../input-models/transactions';
import { authenticate, checkTransactionOwner, validate } from '../middleware';
import { transactionsController } from '../controllers';

const transactionsRouter = express.Router();

transactionsRouter.post(
    '/buyTicket/:ticketID',
    transactionsSchemas.buyTicket,
    validate,
    authenticate,
    transactionsController.buyTicket
);
transactionsRouter.get(
    '/getTicketsForUser',
    transactionsSchemas.getTicketsForUser,
    validate,
    authenticate,
    transactionsController.getTicketsForUser
);
transactionsRouter.put(
    '/cancelTicket/:transactionID',
    transactionsSchemas.cancelTicket,
    validate,
    authenticate,
    checkTransactionOwner,
    transactionsController.cancelTicket
);

export default transactionsRouter;
