import express from "express"
import { getAllClasses, getClass, getClassesByDays } from "../controllers/classes.js"

const router = express.Router()

router.route('/').get(getAllClasses);
router.route('/:id').get(getClass);
router.route('/day/:day').get(getClassesByDays);


export default router;