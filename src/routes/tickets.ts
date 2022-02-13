import express from 'express';

import * as ticketsSchemas from '../input-models/tickets';
import { validate } from '../middleware';
import { ticketsController } from '../controllers';

const authRouter = express.Router();

authRouter.get('/getTickets', ticketsSchemas.getTickets, validate, ticketsController.getTickets);

export default authRouter;
