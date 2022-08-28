import { deleteUserById, getUserById, getUsers, updateUserById } from "../models/users.js";
import validator from "validator";
import bcrypt from "bcrypt"

export const getAllUsers = async(req, res) => {
  const [users] = await getUsers();
  if(!users) return res.status(204).json({"Message": "No users found"});
  res.json(users)
};

export const getUser = async (req, res) => {
  if(req?.params?.user_id) return res.status(400).json({"Message": "User ID required"});
  const { id } = req.params

  const [foundUser] = await getUserById(id).then(users => users[0]);
  
  if(!foundUser) return res.status(204).json({"Message": `User ID ${id} not found.`});
  res.json(foundUser)
};

export const updateUser = async (req, res) => {
  if(req?.params?.user_id) return res.status(400).json({"Message": "User ID required"});
  const { id } = req.params
  const { firstname, lastname, role, username, password } = req.body;
  
  let encryptedPassword = password;
  if(!password.startsWith("$")) encryptedPassword = bcrypt.hashSync(password, 10);

  // Validate Inputs
  if(!validator.isAlpha(firstname, 'en-AU', {ignore: ' -'})) return res.status(400).json("Invalid first name.");
  if(!validator.isAlpha(lastname, 'en-AU', {ignore: ' -'})) return res.status(400).json("Invalid last name.");
  if(!validator.isAlpha(role, 'en-AU')) return res.status(400).json("Invalid last name.");
  if(!validator.isAlphanumeric(username)) return res.status(400).json("Invalid user name.");

  try {
    const [results] = await updateUserById(
      id,
      validator.escape(firstname),
      validator.escape(lastname),
      validator.escape(role),
      validator.escape(username),
      encryptedPassword
    );
    if(results.affectedRows > 0) return res.json({"Message": `User ID: ${id} has been updated.`})
  } catch (error) {
    console.log(error.message);
  }
}

export const deleteUser = async(req, res) => {
  if(req?.body?.id) return res.status(400).json({"Message": "User ID required"});

  try {
    const [results] = await deleteUserById(req.body.user_id);
    if(results.affectedRows > 0) return res.json({"Message": `User ID: ${id} has been deleted.`})
  } catch (error) {
    console.log(error.message)
  }
};
