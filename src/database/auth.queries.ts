import { SQLException } from '../exceptions';
import { IRegisterBody, IUserByEmail } from '../interfaces';
import { MySQLBoolean } from '../types';
import { jwtHandler } from '../util';
import db from './connection';

const getUserIDById = async (userID: number): Promise<MySQLBoolean | SQLException> => {
    try {
        const [rows] = await db.query(
            `
        SELECT EXISTS(SELECT id FROM users u
        WHERE id = ?) as exist;
            `,
            [userID]
        );
        const reponse: MySQLBoolean = Object.values(rows)[0].exist;
        return reponse;
    } catch (e: unknown) {
        console.log(e);
        throw e as SQLException;
    }
};

const getEmailUserByEmail = async (email: string): Promise<IUserByEmail | SQLException> => {
    try {
        const [rows] = await db.query(
            `
        SELECT id, email, username, password FROM users u
        WHERE email = ?;
            `,
            [email]
        );
        const response = Object.values(rows)[0];
        const token = await jwtHandler.generateToken({
            id: response.id as number
        });
        return {
            email: response.email,
            password: response.password,
            username: response.username,
            token: token as string
        };
    } catch (e: unknown) {
        console.log(e);
        throw e as SQLException;
    }
};

const checkIfUserExist = async (email: string): Promise<MySQLBoolean | SQLException> => {
    try {
        const [rows] = await db.query(
            `
            SELECT EXISTS(SELECT id FROM users
            WHERE email = ?) as exist;
        `,
            [email]
        );
        const reponse: MySQLBoolean = Object.values(rows)[0].exist;
        return reponse;
    } catch (e: unknown) {
        console.log(e);
        throw e as SQLException;
    }
};

const createUser = async (
    body: IRegisterBody,
    hashedPassword: string
): Promise<number | SQLException> => {
    try {
        const [rows] = await db.query(
            `INSERT INTO users (email, username, password, card_number)
                VALUES (?, ?, ?, ?);`,
            [body.email, body.username, hashedPassword, body.card_number]
        );
        const data = Object.entries(rows);
        const userID = data[2][1];
        return userID;
    } catch (e: unknown) {
        console.log(e);
        throw e as SQLException;
    }
};

const checkCard = async (
    userID: number,
    card_number: string
): Promise<MySQLBoolean | SQLException> => {
    try {
        const [rows] = await db.query(
            `
            SELECT EXISTS(SELECT id FROM users
            WHERE id = ? AND card_number = ?) as exist;
        `,
            [userID, card_number]
        );
        const reponse: MySQLBoolean = Object.values(rows)[0].exist;
        return reponse;
    } catch (e: unknown) {
        console.log(e);
        throw e as SQLException;
    }
};

export { getUserIDById, getEmailUserByEmail, checkIfUserExist, createUser, checkCard };
