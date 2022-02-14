import { ticketsQueries } from '.';
import { SQLException } from '../exceptions';
import { ITransaction } from '../interfaces';
import { MySQLBoolean, TicketStatus } from '../types';
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
        const code =
            Math.random().toString(36).substring(2, 15) +
            Math.random().toString(36).substring(2, 15);
        const [rows] = await db.query(
            `INSERT INTO users (user_id, ticket_id, status, amount, code)
                VALUES (?, ?, ?, (SELECT price FROM tickets WHERE id = ?));`,
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
const getDepartureTime = async (transactionID: number): Promise<string | SQLException> => {
    try {
        const [rows] = await db.query(
            `
            SELECT 
                tic.departure
            FROM transactions transac
                INNER JOIN tickets tic ON tic.id = transac.ticket_id
            WHERE transac.id = ?;
        `,
            [transactionID]
        );
        const reponse = Object.values(rows)[0].departure;
        return reponse;
    } catch (e: unknown) {
        console.log(e);
        throw e as SQLException;
    }
};

const cancelTransaction = async (transactionID: number): Promise<void | SQLException> => {
    try {
        await db.query(
            `
            UPDATE tickets SET number_of_seats = number_of_seats + 1 WHERE id = ?
        `,
            [transactionID]
        );
        await ticketsQueries.increaseNumberOfSeat(transactionID);
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
    cancelTransaction
};
