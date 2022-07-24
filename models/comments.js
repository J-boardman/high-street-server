import { db_conn } from "../config/db_conn.js";

// ? CRUD
export const createNewComment = (blog_id, author_id, body) => db_conn.query(
  `INSERT INTO comments (blog_id, author_id, body, posted_at, updated_at)
  VALUES (?, ?, ?, NOW(), NOW())`, [blog_id, author_id, body]
);

export const getAllComments = (id) => db_conn.query(
  `SELECT comment_id, CONCAT(firstname, " ", lastname) as author, body, posted_at, updated_at
  FROM comments
  JOIN users on author_id = user_id
  WHERE blog_id = ?`, [id]
);

export const updateCommentById = (id, body) => db_conn.query(
  `UPDATE comments
  SET body = ?, updated_at = NOW()
  WHERE comment_id = ?`, [body, id]
);

export const deleteCommentById = (id) => db_conn.query(`DELETE FROM comments WHERE comment_id = ?`, [id]);