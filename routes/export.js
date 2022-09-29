import express from "express"
import { exportClasses, exportCustomerBookings, exportTrainerBookings, exportUserList } from "../controllers/export.js";

const router = express.Router()

router.route("/classes").get(exportClasses);
router.route("/users").get(exportUserList);
router.route("/trainer_bookings/:id").get(exportTrainerBookings);
router.route("/customer_bookings/:id").get(exportCustomerBookings);


export default router;