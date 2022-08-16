import { db_conn } from "../config/db_conn.js";

// ? CRUD
export const createNewBlog = (author_id, title, body) => (
  db_conn.query(
    `INSERT INTO blogs (author_id, title, body, posted_at, updated_at) VALUES (?, ?, ?, NOW(), NOW())`,
    [author_id, title, body]
  )
);

export const getAllBlogs = () => (
  db_conn.query(`
    SELECT blog_id, author_id, CONCAT(firstname, " ", lastname) as author, title, body, posted_at, updated_at 
    FROM blogs
    JOIN users ON author_id = user_id`
  )
)
export const getBlogById = (id) => (
  db_conn.query(`
    SELECT blog_id, author_id, CONCAT(firstname, " ", lastname) as author, title, body, posted_at, updated_at 
    FROM blogs
    JOIN users ON author_id = user_id
    WHERE blog_id = ?`, [id]
  )
);

export const getBlogBySearch = (search) => (
  db_conn.query(
    `SELECT blog_id, author_id, CONCAT(firstname, " ", lastname) as author, title, body, posted_at, updated_at 
    FROM blogs
    JOIN users ON author_id = user_id
    WHERE blog_id LIKE ?
    OR firstname LIKE ?
    OR lastname LIKE ?
    OR title LIKE ?`,
    [`%${search}%`, `%${search}%`, `%${search}%`, `%${search}%`]
  )
);

export const updateBlogById = (id, title, body) => (
  db_conn.query(
    `UPDATE blogs 
    SET title = ?, body = ?, updated_at = NOW()
    WHERE blog_id = ?`,
    [title, body, id]
  )
);

export const deleteBlogById = (id) => db_conn.query(`DELETE FROM blogs WHERE blog_id = ?`, [id]);