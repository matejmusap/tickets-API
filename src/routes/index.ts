import express, { Request, Response } from 'express';
import swaggerUi from 'swagger-ui-express';
import { generateDocumentation } from '../swagger';
import authRouter from './auth';

const router = express.Router();

router.use('/auth', authRouter);

const documentation = generateDocumentation();
router.use('/', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(documentation));
router.get('/swagger', (_req: Request, res: Response) => {
    return res.send(JSON.stringify(documentation, null, 2));
});

export default router;
