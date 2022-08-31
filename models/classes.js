import { db_conn } from "../config/db_conn.js";

// ? CRUD
export const createNewClass = (trainer_id, name, description, day, start_time, end_time, level, spots_available) => (
  db_conn.query(
    `INSERT INTO classes (trainer_id, class_name, description, day, start_time, end_time, level, spots_available)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [trainer_id, name, description, day, start_time, end_time, level, spots_available]
  )
);

export const getClasses = () => (
  db_conn.query(
    `SELECT class_id, trainer_id, class_name, CONCAT(firstname, " ", lastname) as trainer, description, day, start_time, end_time, level, spots_available
    FROM classeszz
    JOIN users ON trainer_id = user_id`
  )
);

export const getClassById = (id) => (
  db_conn.query(
    `SELECT class_id, trainer_id, class_name, CONCAT(firstname, " ", lastname) as trainer, description, day, start_time, end_time, level, spots_available
    FROM classes
    JOIN users ON trainer_id = user_id
    WHERE class_id = ?`, [id]
  )
);

export const getClassesByDay = (day) => (
  db_conn.query(
    `SELECT class_id, trainer_id, class_name, CONCAT(firstname, " ", lastname) as trainer, description, day, start_time, end_time, level, spots_available
    FROM classes
    JOIN users ON trainer_id = user_id
    WHERE day = ?`, [day]
  ) 
)

export const getClassesByTrainerId = (id) => (
  db_conn.query(
    `SELECT class_id, trainer_id, class_name, CONCAT(firstname, " ", lastname) as trainer, description, day, start_time, end_time, level, spots_available
    FROM classes
    JOIN users ON trainer_id = user_id
    WHERE trainer_id = ?`, [id]
  ) 
)

export const getClassAvailability = (id) => (
  db_conn.query(`SELECT spots_available FROM classes WHERE class_id = ?`, [id])
)

export const changeClassAvailability = (spots, id) => (
  db_conn.query(`UPDATE classes SET spots_available = ? WHERE class_id = ?`, [spots, id])
);

export const updateClassById = (id, trainer_id, class_name, description, day, start_time, end_time, level, spots_available) => (
  db_conn.query(
    `UPDATE classes 
    SET trainer_id = ?, class_name = ?, description = ?, day = ?, start_time = ?, end_time = ?, level = ?, spots_available = ? 
    WHERE class_id = ?`,
    [trainer_id, class_name, description, day, start_time, end_time, level, spots_available, id]
  )
);

export const deleteClassById = (id) => db_conn.query(`DELETE FROM classes WHERE class_id = ?`, [id]);
