import { createUser, getUserByUsername } from "../models/users.js"
import bcrypt from "bcrypt"

export default async (req, res) => {
  const { firstname, lastname, username, password } = req.body;
  if(!username || !password ) return res.status(400).json({'message': 'Username and password are required.'});

  // Search for duplicate username:
  const [user] = await getUserByUsername(username);
  if(user.find(user => user === username)) return res.sendStatus(409);

  try {
    const [results] = await createUser(
      firstname, 
      lastname, 
      'customer', 
      username,
      bcrypt.hashSync(password, 10)
    );

    res.status(201).json({"success": `User created with the ID: ${results.insertId}`});
  } catch (error) {
    res.status(500).json({"failure": error.message});
  }
};