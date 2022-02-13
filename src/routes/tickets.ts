import express from 'express';

import * as ticketsSchemas from '../input-models/tickets';
import { validate } from '../middleware';
import { ticketsController } from '../controllers';

const ticketsRouter = express.Router();

ticketsRouter.get('/getTickets', ticketsSchemas.getTickets, validate, ticketsController.getTickets);

export default ticketsRouter;
