import { getUserByUsername, updateAccessToken, updateRefreshToken } from "../models/users.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken"

export default async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({"message": "Username and password are required."});

  const [foundUser] = await getUserByUsername(username).then(users => users[0]);
  if(!foundUser) return res.sendStatus(401);

  // Match password
  const match = bcryptjs.compareSync(password, foundUser.password);
  if (!match) return res.sendStatus(401);

  const accessToken = jwt.sign(
    {
      UserInfo: {
        username: foundUser.username,
        role: foundUser.role
      },
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "300s" }
  );

  const refreshToken = jwt.sign(
    { username: foundUser.username },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "1d"}
  );
  await updateAccessToken(foundUser.user_id, accessToken);
  await updateRefreshToken(foundUser.user_id, refreshToken);

  res.cookie("jwt", refreshToken, {
    httpOnly: true,
    sameSite: "None",
    maxAge: 24 * 60 * 60 * 1000
  }); // secure: true over https

  res.json({ user_id: foundUser.user_id, role: foundUser.role, accessToken })
}