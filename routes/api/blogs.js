import express from "express"
import { getBlogs, deleteBlog, getBlog, updateBlog, createBlog } from "../../controllers/blogs.js"
import verifyRoles from "../../middleware/verifyRoles.js"

const router = express.Router()

router.route('/')
  .get(verifyRoles('customer', 'admin', 'trainer'), getBlogs)
  .post(verifyRoles('admin', 'trainer'), createBlog)
  .delete(verifyRoles('admin', 'trainer'), deleteBlog);

router.route('/:id')
  .get(verifyRoles('customer', 'admin', 'trainer'), getBlog)
  .post(verifyRoles('admin', 'trainer'), updateBlog)

export default router;