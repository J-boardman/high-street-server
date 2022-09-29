import mysql from "mysql2/promise"

const {DB_HOST, DB_USER, DB_PASSWORD, DATABASE} = process.env;

export const db_conn = mysql.createPool({
  host: 'localhost',
  user: 'jayde', 
  password: 'Password123!',
  database: 'high_street_gym'
});

export const query = (...args) => db_conn.query(...args);
