import mysql from "mysql2/promise"

const {DB_HOST, DB_USER, DB_PWD, DB_DB} = process.env;

export const db_conn = mysql.createPool({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PWD,
  database: DB_DB,
});