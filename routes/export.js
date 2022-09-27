import express from "express"
import { exportBookings } from "../controllers/export.js";

const router = express.Router()

router.route("/bookings").get(exportBookings);


export default router;