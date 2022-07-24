import express from "express"
import { getComments, deleteComment, updateComment, createComment } from "../../controllers/comments.js"

const router = express.Router()

router.route('/')
  .post(createComment)
  .delete(deleteComment);

router.route('/:id')
  .post(updateComment)

export default router;