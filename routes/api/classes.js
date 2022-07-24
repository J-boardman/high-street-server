import express from "express"
import { deleteClass, updateClass, createClass } from "../../controllers/classes.js"
import verifyRoles from "../../middleware/verifyRoles.js"

const router = express.Router()

router.route('/')
  .post(verifyRoles('admin', 'trainer'), createClass)
  .delete(verifyRoles('admin', 'trainer'), deleteClass);

router.route('/:id').post(verifyRoles('admin', 'trainer'), updateClass);

export default router;