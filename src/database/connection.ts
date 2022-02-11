import mysql from 'mysql2/promise';

const db = mysql.createPool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 60,
    queueLimit: 1500,
    multipleStatements: true,
    dateStrings: true
});

export default db;
