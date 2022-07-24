import express from "express"
import { getAllUsers, deleteUser, getUser, updateUser } from "../../controllers/users.js"
import verifyRoles from "../../middleware/verifyRoles.js"

const router = express.Router()

router.route('/')
  .get(verifyRoles('admin'), getAllUsers)
  .delete(verifyRoles('admin'), deleteUser);

router.route('/:id')
  .get(verifyRoles('admin'), getUser)
  .post(verifyRoles('admin'), updateUser)

export default router;