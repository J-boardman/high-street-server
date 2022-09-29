import { query } from "../config/db_conn.js";
// SELECT FROM JOIN CLAUSE
const SELECT_FROM_JOIN = (
  `SELECT class_id, trainer_id, class_name, CONCAT(firstname, " ", lastname) as trainer, description, day, start_time, end_time, level, spots_available
  FROM classes
  JOIN users ON trainer_id = user_id`
)

// CREATES
export const createNewClass = (...args) => query(
  `INSERT INTO classes (trainer_id, class_name, description, day, start_time, end_time, level, spots_available)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?)`, [...args]
);

// READS
export const getClasses = () => query(SELECT_FROM_JOIN)
export const getClassById = (id) => query(`${SELECT_FROM_JOIN} WHERE class_id = ?`, [id]);
export const getClassesByDay = (day) => query(`${SELECT_FROM_JOIN} WHERE day = ?`, [day]) 
export const getClassesByTrainerId = (id) => query(`${SELECT_FROM_JOIN} WHERE trainer_id = ?`, [id])
export const getClassAvailability = (id) => query(`SELECT spots_available FROM classes WHERE class_id = ?`, [id]);

// UPDATES
export const changeClassAvailability = (spots, id) => query(`UPDATE classes SET spots_available = ? WHERE class_id = ?`, [spots, id]);
export const updateClassById = (...args) => query(
  `UPDATE classes 
  SET trainer_id = ?, class_name = ?, description = ?, day = ?, start_time = ?, end_time = ?, level = ?, spots_available = ? 
  WHERE class_id = ?`, [...args]
);

// DELETES
export const deleteClassById = (id) => query(`DELETE FROM classes WHERE class_id = ?`, [id]);