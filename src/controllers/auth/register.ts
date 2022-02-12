import { NextFunction, Request, Response } from 'express';
import { IRegisterBody } from '../../interfaces';
import * as queries from '../../database';
import { MySQLBoolean } from '../../types';
import { jwtHandler, managePassword } from '../../util';

const register = async (req: Request, res: Response, _next: NextFunction) => {
    const body: IRegisterBody = req.body;
    try {
        const userCheck = (await queries.authQueries.checkIfUserExist(body.email)) as MySQLBoolean;
        if (userCheck === 0) {
            const hashedPassword = await managePassword.hashPassword(body.password as string);
            delete body.password;
            const userID = await queries.authQueries.createUser(body, hashedPassword);
            const token = await jwtHandler.generateToken({
                id: userID as number
            });
            res.set('Authorization', `Bearer ${token}`);
            return res.status(200).send({
                data: { user: body },
                code: 200,
                message: 'You are Registred in by Email!'
            });
        } else {
            return res.status(400).send({
                data: { body },
                code: 400,
                message: 'User is alredy registred!'
            });
        }
    } catch (e) {
        console.log(e);
        return res.status(400).send({
            data: {},
            code: 400,
            message: 'Something happened on Registration!'
        });
    }
};

export default register;
