import express from "express"
import { getAllClasses, getAvailability, getClass, getClassesByDays, getClassesByTrainer } from "../controllers/classes.js"

const router = express.Router()

router.route('/').get(getAllClasses);
router.route('/:id').get(getClass);
router.route('/availability/:id').get(getAvailability);
router.route('/day/:day').get(getClassesByDays);
router.route('/trainer/:id').get(getClassesByTrainer);


export default router;