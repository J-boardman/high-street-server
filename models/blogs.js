import { query } from "../config/db_conn.js";

const SELECT_FROM_JOIN = (
  `SELECT blog_id, author_id, CONCAT(firstname, " ", lastname) as author, title, body, posted_at, updated_at 
  FROM blogs JOIN users ON author_id = user_id`
);

// ? CRUD
export const createNewBlog = (...args) => query(
  `INSERT INTO blogs (author_id, title, body, posted_at, updated_at) VALUES (?, ?, ?, NOW(), NOW())`, [...args]
);

export const getAllBlogs = () => query(SELECT_FROM_JOIN);
export const getBlogById = (id) => query(`${SELECT_FROM_JOIN} WHERE blog_id = ?`, [id]);
export const getBlogBySearch = (search) => query(
  `${SELECT_FROM_JOIN} 
  WHERE blog_id LIKE ? OR firstname LIKE ?
  OR lastname LIKE ?
  OR title LIKE ?`,
  [`%${search}%`, `%${search}%`, `%${search}%`, `%${search}%`]
);

export const updateBlogById = (id, title, body) => query(
  `UPDATE blogs SET title = ?, body = ?, updated_at = NOW() WHERE blog_id = ?`, [title, body, id]
);

export const deleteBlogById = (id) => db_conn.query(`DELETE FROM blogs WHERE blog_id = ?`, [id]);