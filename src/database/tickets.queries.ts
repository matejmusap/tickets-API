import { SQLException } from '../exceptions';
import { ITicket } from '../interfaces';
import db from './connection';

const getAllTickets = async (): Promise<ITicket[] | SQLException> => {
    try {
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
            INNER JOIN transport_company tc ON t.company_id = tc.id;
            `
        );

        const response = Object.values(rows);
        return response;
    } catch (e: unknown) {
        console.log(e);
        throw e as SQLException;
    }
};

export { getAllTickets };
