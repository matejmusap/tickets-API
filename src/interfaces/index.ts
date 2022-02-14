import { Availability, CanBeUndefined, TicketStatus } from '../types';

export interface IENV {
    NODE_ENV: CanBeUndefined<string>;
    PORT: CanBeUndefined<number>;
}
export interface IConfig {
    NODE_ENV: string;
    PORT: number;
}
export interface ITokenData {
    id: number;
}
export interface IRegisterBody {
    username: string;
    email: string;
    password?: string;
    card_number?: string;
}
export interface ILoginBody {
    email: string;
    password?: string;
}
export interface IUserByEmail {
    token?: string;
    password?: string;
    email: string;
    username: string;
}
export interface ITicket {
    id: number;
    company: string;
    point_of_departure: string;
    destination: string;
    departure: string;
    arrival: string;
    availability: Availability;
    price: number;
}
export interface ITransaction {
    username: string;
    email: string;
    amount: number;
    status: TicketStatus;
    from: string;
    destination: string;
    departure: string;
    arrival: string;
    company_name: string;
}
