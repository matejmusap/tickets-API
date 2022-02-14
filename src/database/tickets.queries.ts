import { DateTime } from 'luxon';
import { SQLException } from '../exceptions';
import { ITicket } from '../interfaces';
import db from './connection';

const getAllTickets = async (): Promise<ITicket[] | SQLException> => {
    try {
        const now = DateTime.now();
        const [rows] = await db.query(
            `
        SELECT tc.company_name AS company,
                t.id as id.
                t.from AS point_of_departure,
                t.destination AS destination,
                t.departure AS departure,
                t.arrival AS arrival,
                r.price as price
            (CASE
                WHEN t.number_of_seats > 0 THEN 'available'
                ELSE 'not_available'
            END) AS availability
        FROM tickets t
            INNER JOIN transport_company tc ON t.company_id = tc.id
            WHERE  t.departure > CAST(? AS DATE);
            `,
            [now]
        );

        const response = Object.values(rows);
        return response;
    } catch (e: unknown) {
        console.log(e);
        throw e as SQLException;
    }
};

const getNumberOfSeats = async (ticketID: number): Promise<number | SQLException> => {
    try {
        const [rows] = await db.query(
            `
            SELECT number_of_seats FROM tickets
            WHERE id = ?;
        `,
            [ticketID]
        );
        const reponse = Object.values(rows)[0].number_of_seats;
        return reponse;
    } catch (e: unknown) {
        console.log(e);
        throw e as SQLException;
    }
};

const decreaseNumberOfSeat = async (ticketID: number): Promise<void | SQLException> => {
    try {
        await db.query(
            `
            UPDATE tickets SET number_of_seats = number_of_seats - 1 WHERE id = ?
        `,
            [ticketID]
        );
    } catch (e: unknown) {
        console.log(e);
        throw e as SQLException;
    }
};

const increaseNumberOfSeat = async (transactionID: number): Promise<void | SQLException> => {
    try {
        await db.query(
            `
            UPDATE tickets 
            SET number_of_seats = number_of_seats + 1 
            WHERE id = (SELECT ticket_id FROM transactions WHERE id = ?)
        `,
            [transactionID]
        );
    } catch (e: unknown) {
        console.log(e);
        throw e as SQLException;
    }
};

export { getAllTickets, getNumberOfSeats, decreaseNumberOfSeat, increaseNumberOfSeat };
