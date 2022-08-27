import express from "express"
import verifyRoles from "../../middleware/verifyRoles.js"
import { createBooking, deleteBooking, getBooking, getBookings, getBookingsByClass, getBookingsByCustomer, getBookingsByTrainer } from "../../controllers/bookings.js";

const router = express.Router()

router.route('/')
  .get(getBookings)
  .post(verifyRoles('customer', 'trainer'), createBooking)
  .delete(deleteBooking);

router.route('/:id').get(getBooking);
router.route('/class/:id').get(getBookingsByClass);
router.route('/customer/:id').get(getBookingsByCustomer);
router.route('/trainer/:id').get(verifyRoles('trainer', 'admin'), getBookingsByTrainer);

export default router;