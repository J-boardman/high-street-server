import mysql from "mysql2/promise"

const {
  MYSQLDATABASE,
  MYSQLHOST,
  MYSQLPORT,
  MYSQLUSER,
  MYSQLPASSWORD,
  MYSQL_URL,
} = process.env;

export const db_conn = mysql.createPool({
  database: MYSQLDATABASE,
  host: MYSQLHOST,
  port: MYSQLPORT,
  user: MYSQLUSER,
  password: MYSQLPASSWORD,
  uri: MYSQL_URL,
});

export const query = (...args) => db_conn.query(...args);
