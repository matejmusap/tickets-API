import { MySQLBoolean } from '../types';
import db from './connection';

const getUserIDById = async (userID: number): Promise<MySQLBoolean> => {
    const [rows] = await db.query(
        `
    SELECT EXISTS(SELECT id FROM users u
    WHERE id = ?) as exist;
        `,
        [userID]
    );
    const reponse: MySQLBoolean = Object.values(rows)[0].exist;
    return reponse;
};

export { getUserIDById };
