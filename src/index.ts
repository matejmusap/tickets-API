import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { morganMiddleware } from './middleware';
import * as exceptions from './exceptions';

import router from './routes';

dotenv.config();
const PORT = process.env.PORT || 3000;
const app = express();

app.use(
    cors({
        credentials: true,
        origin: true
    })
);
app.use(morganMiddleware);
app.use(express.json());
app.use(
    express.urlencoded({
        extended: true
    })
);
app.use('/api', router);

// error handler middleware
app.use(
    (
        error: exceptions.HttpException,
        _request: Request,
        response: Response,
        _next: NextFunction
    ) => {
        const status = error.status || 500;
        const message = error.message || 'Something went wrong';
        response.status(status).send({
            message,
            status
        });
    }
);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}!`);
});
