import express from 'express';

import * as authSchemas from '../input-models/auth';
import { validate } from '../middleware';
import { authController } from '../controllers';

const authRouter = express.Router();

authRouter.post('/register', authSchemas.register, validate, authController.register);

authRouter.post('/login', authSchemas.login, validate, authController.login);

export default authRouter;
