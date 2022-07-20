import { db_conn } from "../config/db_conn.js";

// ? CRUD
export const createUser = (firstname, lastname, role, username, password) => (
  db_conn.query(
    `INSERT INTO users (firstname, lastname, role, username, password)
    VALUES (?, ?, ?, ?, ?)`,
    [firstname, lastname, role, username, password]
  )
);

export const getUsers = () => db_conn.query(`SELECT * FROM users`);
export const getUserById = (id) => db_conn.query(`SELECT * FROM users WHERE user_id = ?`, [id]);
export const getUserByUsername = (username) => db_conn.query(`SELECT * FROM users WHERE username = ?`, [username])

export const updateUser = (id, firstname, lastname, role, username, password) => (
  db_conn.query(
    `UPDATE users
    SET firstname = ?, lastname = ?, role = ?, username = ?, password =?
    WHERE user_id = ?`,
    [firstname, lastname, role, username, password, id]
  )
);

export const deleteUser = (id) => db_conn.query(`DELETE FROM users WHERE user_id = ?`, [id]);