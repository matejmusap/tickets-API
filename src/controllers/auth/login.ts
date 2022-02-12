import { NextFunction, Request, Response } from 'express';
import { managePassword } from '../../util';
import * as queries from '../../database';
import { ILoginBody, IUserByEmail } from '../../interfaces';

const login = async (req: Request, res: Response, _next: NextFunction) => {
    const body: ILoginBody = req.body;
    try {
        const user = (await queries.authQueries.getEmailUserByEmail(body.email)) as IUserByEmail;
        const checkPassword = await managePassword.comparePassword(
            body.password as string,
            user.password as string
        );
        delete user.password;
        if (!checkPassword) {
            return res.status(400).send({
                data: {},
                code: 400,
                message: 'Wrong password!'
            });
        }

        res.set('Authorization', `Bearer ${user.token}`);
        delete user.token;
        return res.status(200).send({
            data: { user },
            code: 200,
            message: 'You are Logged in!'
        });
    } catch (e) {
        console.log(e);
        return res.status(400).send({
            data: {},
            code: 400,
            message: 'Something happened on Login!'
        });
    }
};

export default login;
