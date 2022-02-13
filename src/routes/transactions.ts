transactonRouter.post('/buyTicket/:ticketID',  transactionsSchemas.buyTicket, validate, authenticate, transactionsController.buyTicket);
ticketsRouter.get('/getTicketsForUser', transactionsSchemas.getTicketsForUser, validate, authenticate, transactionsController.getTicketsForUser);
transactonRouter.put('/cancelTicket/:transactionID',  transactionsSchemas.cancelTicket, validate, authenticate, transactionsController.cancelTicket);
