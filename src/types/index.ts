import { RowDataPacket, OkPacket, ResultSetHeader } from 'mysql2/promise';

export type CanBeUndefined<T> = T | undefined;
export type CanBeNull<T> = T | null;
export type QueryResponse =
    | RowDataPacket[]
    | RowDataPacket[][]
    | OkPacket
    | OkPacket[]
    | ResultSetHeader;
export type MySQLBoolean = 0 | 1;
export type Availability = 'available' | 'not_available';
