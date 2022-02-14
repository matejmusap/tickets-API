import { ticketsQueries } from '.';
import { SQLException } from '../exceptions';
import { ITransaction } from '../interfaces';
import { MySQLBoolean, TicketStatus } from '../types';
import { getUniqueCode } from '../util';
import db from './connection';

const checkIsUserOwner = async (
    userID: number,
    transactionID: number
): Promise<MySQLBoolean | SQLException> => {
    try {
        const [rows] = await db.query(
            `
            SELECT EXISTS(SELECT id FROM transactions
            WHERE user_id = ? AND transaction_id = ?) as exist;
        `,
            [userID, transactionID]
        );
        const reponse: MySQLBoolean = Object.values(rows)[0].exist;
        return reponse;
    } catch (e: unknown) {
        console.log(e);
        throw e as SQLException;
    }
};

const checkIfCode = async (code: string): Promise<MySQLBoolean | SQLException> => {
    try {
        const [rows] = await db.query(
            `
            SELECT EXISTS(SELECT id FROM transactions
            WHERE  AND code = ?) as exist;
        `,
            [code]
        );
        const reponse: MySQLBoolean = Object.values(rows)[0].exist;
        return reponse;
    } catch (e: unknown) {
        console.log(e);
        throw e as SQLException;
    }
};

const getTransactionByID = async (transactionID: number): Promise<ITransaction | SQLException> => {
    try {
        const [rows] = await db.query(
            `
            SELECT 
                u.username, u.email, 
                transac.amount, 
                transac.status, 
                tic.from, 
                tic.destination, 
                tic.departure, 
                tic.arrival, 
                trancom.company_name 
            FROM transactions transac
                INNER JOIN users u ON u.id = transac.user_id
                INNER JOIN tickets tic ON tic.id = transac.ticket_id
                INNER JOIN transport_companies trancom ON trancom.id = tic.company_id
            WHERE transac.id = ?;
        `,
            [transactionID]
        );
        const reponse: ITransaction = Object.values(rows)[0];
        return reponse;
    } catch (e: unknown) {
        console.log(e);
        throw e as SQLException;
    }
};

const createTransaction = async (
    userID: number,
    status: TicketStatus,
    ticketID: number
): Promise<ITransaction | SQLException> => {
    try {
        const code = await getUniqueCode();
        const [rows] = await db.query(
            `INSERT INTO transactions (user_id, ticket_id, status, amount, code)
                VALUES (?, ?, ?, (SELECT price FROM tickets WHERE id = ?), ?);`,
            [userID, ticketID, status, ticketID, code]
        );
        const data = Object.entries(rows);
        const transactionID = data[2][1];
        const transaction = await getTransactionByID(transactionID);
        return transaction;
    } catch (e: unknown) {
        console.log(e);
        throw e as SQLException;
    }
};

const getTicketsForUser = async (userID: number): Promise<ITransaction[] | SQLException> => {
    try {
        const [rows] = await db.query(
            `
            SELECT 
                u.username, 
                u.email, 
                transac.amount, 
                transac.status, 
                tic.from, 
                tic.destination, 
                tic.departure, 
                tic.arrival, 
                trancom.company_name 
            FROM transactions transac
                INNER JOIN users u ON u.id = transac.user_id
                INNER JOIN tickets tic ON tic.id = transac.ticket_id
                INNER JOIN transport_companies trancom ON trancom.id = tic.company_id
            WHERE transac.user_id = ?;
        `,
            [userID]
        );
        const reponse: ITransaction[] = Object.values(rows);
        return reponse;
    } catch (e: unknown) {
        console.log(e);
        throw e as SQLException;
    }
};
const getDepartureTime = async (code: string): Promise<string | SQLException> => {
    try {
        const [rows] = await db.query(
            `
            SELECT 
                tic.departure
            FROM transactions transac
                INNER JOIN tickets tic ON tic.id = transac.ticket_id
            WHERE transac.code = ?;
        `,
            [code]
        );
        const reponse = Object.values(rows)[0].departure;
        return reponse;
    } catch (e: unknown) {
        console.log(e);
        throw e as SQLException;
    }
};

const cancelTransaction = async (code: string): Promise<void | SQLException> => {
    try {
        await db.query(
            `
            UPDATE tickets SET number_of_seats = number_of_seats + 1 WHERE code = ?
        `,
            [code]
        );
        await ticketsQueries.increaseNumberOfSeat(code);
    } catch (e: unknown) {
        console.log(e);
        throw e as SQLException;
    }
};

export {
    checkIsUserOwner,
    createTransaction,
    getTicketsForUser,
    getDepartureTime,
    cancelTransaction,
    checkIfCode
};
