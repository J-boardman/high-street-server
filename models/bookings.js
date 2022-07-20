import { db_conn } from "../config/db_conn.js";

// ? CRUD
export const createBooking = (customer_id, class_id) => (
  db_conn.query(`INSERT INTO bookings (customer_id, class_id) VALUES (?, ?)`,
  [customer_id, class_id])
);

export const getBookings = () => (
  db_conn.query(
    `SELECT booking_id, class_name, CONCAT(trainers.firstname, " ", trainers.lastname) as trainer, start_time, CONCAT(customers.firstname, " ", customers.lastname) as customer
    FROM bookings
    JOIN classes ON bookings.class_id = classes.class_id
    JOIN users trainers ON trainers.user_id = trainer_id
    JOIN users customers ON customers.user_id = customer_id`
  )
);

export const getBookingById = (id) => (
  db_conn.query(
    `SELECT booking_id, class_name, CONCAT(trainers.firstname, " ", trainers.lastname) as trainer, start_time, CONCAT(customers.firstname, " ", customers.lastname) as customer
    FROM bookings
    JOIN classes ON bookings.class_id = classes.class_id
    JOIN users trainers ON trainers.user_id = trainer_id
    JOIN users customers ON customers.user_id = customer_id
    WHERE booking_id = ?`, [id]
  )
);

export const updateBooking = (id, class_id, customer_id) => (
  db_conn.query(`UPDATE bookings SET class_id = ?, customer_id = ? WHERE booking_id = ?`, [class_id, customer_id, id])
);

export const deleteBooking = (id) => db_conn.query(`DELETE FROM bookings WHERE booking_id = ?`, [id]);