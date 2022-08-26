import { db_conn } from "../config/db_conn.js";

// ? CRUD
export const createNewBooking = (customer_id, class_id) => (
  db_conn.query(`INSERT INTO bookings (customer_id, class_id) VALUES (?, ?)`,
  [customer_id, class_id])
);

export const getAllBookings = () => (
  db_conn.query(
    `SELECT booking_id, class_name, bookings.class_id, CONCAT(trainers.firstname, " ", trainers.lastname) as trainer, trainer_id, day, start_time, end_time, CONCAT(customers.firstname, " ", customers.lastname) as customer, customer_id
    FROM bookings
    JOIN classes ON bookings.class_id = classes.class_id
    JOIN users trainers ON trainers.user_id = trainer_id
    JOIN users customers ON customers.user_id = customer_id`
  )
);

export const getBookingById = (id) => (
  db_conn.query(
    `SELECT booking_id, class_name, bookings.class_id, CONCAT(trainers.firstname, " ", trainers.lastname) as trainer, trainer_id, day, start_time, end_time, CONCAT(customers.firstname, " ", customers.lastname) as customer, customer_id
    FROM bookings
    JOIN classes ON bookings.class_id = classes.class_id
    JOIN users trainers ON trainers.user_id = trainer_id
    JOIN users customers ON customers.user_id = customer_id
    WHERE booking_id = ?`, [id]
  )
)

export const updateBookingById = (id, class_id, customer_id) => (
  db_conn.query(`UPDATE bookings SET class_id = ?, customer_id = ? WHERE booking_id = ?`, [class_id, customer_id, id])
);

export const getBookingsByCustomerId = (id) => (
  db_conn.query(
    `SELECT booking_id, class_name, bookings.class_id, CONCAT(trainers.firstname, " ", trainers.lastname) as trainer, trainer_id, day, start_time, end_time, CONCAT(customers.firstname, " ", customers.lastname) as customer, customer_id
    FROM bookings
    JOIN classes ON bookings.class_id = classes.class_id
    JOIN users trainers ON trainers.user_id = trainer_id
    JOIN users customers ON customers.user_id = customer_id
    WHERE customer_id = ?`, [id]
  )
)

export const getBookingsByTrainerId = (id) => (
  db_conn.query(
    `SELECT booking_id, class_name, bookings.class_id, CONCAT(trainers.firstname, " ", trainers.lastname) as trainer, trainer_id, day, start_time, end_time, CONCAT(customers.firstname, " ", customers.lastname) as customer, customer_id
    FROM bookings
    JOIN classes ON bookings.class_id = classes.class_id
    JOIN users trainers ON trainers.user_id = trainer_id
    JOIN users customers ON customers.user_id = customer_id
    WHERE trainer_id = ?`, [id]
  )
)

export const getBookingsByClassId = (id) => (
  db_conn.query(
    `SELECT booking_id, class_name, bookings.class_id, CONCAT(trainers.firstname, " ", trainers.lastname) as trainer, trainer_id, day, start_time, end_time, CONCAT(customers.firstname, " ", customers.lastname) as customer, customer_id
    FROM bookings
    JOIN classes ON bookings.class_id = classes.class_id
    JOIN users trainers ON trainers.user_id = trainer_id
    JOIN users customers ON customers.user_id = customer_id
    WHERE classes.class_id = ?`, [id]
  )
)

export const checkDuplicateBookings = (customer_id, booking_id) => (
  db_conn.query("SELECT * FROM bookings WHERE customer_id = ? AND booking_id = ?", [customer_id, booking_id])
);

export const deleteBookingById = (id) => db_conn.query(`DELETE FROM bookings WHERE booking_id = ?`, [id]);