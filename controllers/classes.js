import validator from "validator";
import { createNewClass, deleteClassById, getClassById, getClasses, updateClassById } from "../models/classes.js"

export const createClass = async(req, res) => {
  const { trainer_id, class_name, description, day, start_time, end_time, level, spots_available } = req.body;

  try {
    const [results] = await createNewClass(
      validator.escape(trainer_id),
      validator.escape(class_name),
      validator.escape(description),
      validator.escape(day),
      validator.escape(start_time),
      validator.escape(end_time),
      validator.escape(level),
      validator.escape(spots_available)
    )

    res.status(200).json({"Success": `Class created with the ID: ${results.insertId}`})
  } catch (error) {
    res.status(500).json({"Failure": "Failed to create class."});
    console.log(error)
  }
};

export const getAllClasses = async(req, res) => {
  const [classes] = await getClasses();
  if(!classes) return res.status(204).json({"Message": "No classes found"});
  res.json(classes)
}

export const getClass = async(req, res) => {
  if(req?.params?.class_id) return res.status(400).json({"Message": "Class ID required"});
  const { id } = req.params

  const [foundClass] = await getClassById(id).then(classes => classes[0]);
  
  if(!foundClass) return res.status(204).json({"Message": `Class with the ID: ${id} not found.`});
  res.json(foundClass)
}

export const updateClass = async(req, res) => {
  if(req?.params?.class_id) return res.status(400).json({"Message": "Class ID required"});
  const { id } = req.params
  const { trainer_id, class_name, description, day, start_time, end_time, level, spots_available } = req.body;
  try {
    const [results] = await updateClassById(
      id,
      trainer_id,
      validator.escape(class_name),
      validator.escape(description),
      validator.escape(day),
      validator.escape(start_time),
      validator.escape(end_time),
      validator.escape(level),
      spots_available
    );
    if(results.affectedRows > 0) return res.json({"Message": `Class ID: ${id} has been updated.`})
  } catch (error) {
    console.log(error.message);
}
}

export const deleteClass = async(req, res) => {
  if(!req?.body?.id) return res.status(400).json({"Message": "Class ID required"});
  const { id } = req.body;

  try {
    const [results] = await deleteClassById(id);
    if(results.affectedRows > 0) return res.json({"Message": `Class ID: ${id} has been deleted.`})
  } catch (error) {
    console.log(error.message)
  }
}