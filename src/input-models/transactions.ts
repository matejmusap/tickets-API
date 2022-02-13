import { header, param } from 'express-validator';

const buyTicket = [
    param('ticketID', 'Please provide ticketID').exists({ checkFalsy: true }),
    header('Authorization', 'Please provide Authorization header (bearer token)').exists({
        checkFalsy: true
    })
];

const getTicketsForUser = [
    header('Authorization', 'Please provide Authorization header (bearer token)').exists({
        checkFalsy: true
    })
];

const cancelTicket = [
    param('ticketID', 'Please provide ticketID').exists({ checkFalsy: true }),
    header('Authorization', 'Please provide Authorization header (bearer token)').exists({
        checkFalsy: true
    })
];

export { buyTicket, getTicketsForUser, cancelTicket };
