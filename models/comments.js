import { db_conn } from "../config/db_conn.js";

// ? CRUD

export const createComment = (blog_id, user_id, body) => (
  db_conn.query(
    `INSERT INTO comments (blog_id, user_id, body, posted_at, updated_at)
    VALUES (?, ?, ?, NOW(), NOW())`, [blog_id, user_id, body]
  )
);

export const getComments = (id) => (
  db_conn.query(
    `SELECT comment_id, CONCAT(firstname, " ", lastname) as author, body, posted_at, updated_at
    FROM comments
    JOIN users on author_id = user_id
    WHERE blog_id = ?`, [id]
  )
);

export const updateComment = (id, body, updated_at) => (
  db_conn.query(
    `UPDATE comments
    SET body = ?, updated_at = NOW()
    WHERE comment_id = ?`, [body, updated_at, id]
  )
);

export const deleteComment = (id) => db_conn.query(`DELETE FROM comments WHERE comment_id = ?`, [id]);