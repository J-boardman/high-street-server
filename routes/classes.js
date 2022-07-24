import express from "express"
import { getAllClasses, getClass } from "../controllers/classes.js"

const router = express.Router()

router.route('/')
  .get(getAllClasses)
  
router.route('/:id')
  .get(getClass)

export default router;