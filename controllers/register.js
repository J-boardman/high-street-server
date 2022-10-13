import { createUser } from "../models/users.js"
import bcryptjs from "bcryptjs"
import validator from "validator";

export default async (req, res) => {
  const { firstname, lastname, username, password } = req.body;

  // Validate Inputs
  if(!validator.isAlpha(firstname, 'en-AU', {ignore: ' -'})) return res.status(400).json("Invalid first name.");
  if(!validator.isAlpha(lastname, 'en-AU', {ignore: ' -'})) return res.status(400).json("Invalid last name.");
  if(!validator.isAlphanumeric(username)) return res.status(400).json("Invalid user name.");
  // if(!validator.isStrongPassword(password)) return res.status(400).json("Password is too weak.");

  try {
    // Sanitise inputs and create user:
    const [result] = await createUser(
      validator.escape(firstname), 
      validator.escape(lastname), 
      'customer', 
      validator.escape(username),
      bcryptjs.hashSync(password, 10)
    );

    res.status(201).json({"success": `User created with the ID: ${result.insertId}`});
  } catch (error) {
    res.status(500).json({"failure": error.message});
  }
};