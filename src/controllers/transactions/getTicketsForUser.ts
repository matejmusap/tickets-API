import { NextFunction, Request, Response } from 'express';

const getTicketsForUser = async (_req: Request, res: Response, _next: NextFunction) => {
    try {
        return res.status(200).send({
            data: {},
            code: 200,
            message: 'Tickets bought by one user!'
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

export default getTicketsForUser;
