import express, { Request, Response } from 'express';
import swaggerUi from 'swagger-ui-express';
import { generateDocumentation } from '../swagger';
import authRouter from './auth';
import transactionsRouter from './transactions';
import ticketsRouter from './tickets';

const router = express.Router();

router.use('/auth', authRouter);
router.use('/tickets', ticketsRouter);
router.use('/transactions', transactionsRouter);

const documentation = generateDocumentation();
router.use('/', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(documentation));
router.get('/swagger', (_req: Request, res: Response) => {
    return res.send(JSON.stringify(documentation, null, 2));
});

export default router;
