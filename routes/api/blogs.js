import express from "express"
import { getBlogs, deleteBlog, getBlog, updateBlog, createBlog } from "../../controllers/blogs.js"
import { getComments } from "../../controllers/comments.js";
import verifyRoles from "../../middleware/verifyRoles.js"

const router = express.Router()

router.route('/')
  .get(getBlogs)
  .post(verifyRoles('admin', 'trainer'), createBlog)
  .delete(verifyRoles('admin', 'trainer'), deleteBlog);

router.route('/:id')
  .get(getBlog)
  .post(verifyRoles('admin', 'trainer'), updateBlog);

router.route('/:id/comments')
  .get(getComments)

export default router;