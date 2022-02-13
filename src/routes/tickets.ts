import express from 'express';
import { ticketsController } from '../controllers';

const ticketsRouter = express.Router();

ticketsRouter.get('/getTickets', ticketsController.getTickets);

export default ticketsRouter;
