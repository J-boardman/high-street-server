import jwt from "jsonwebtoken"
import { getUserByRefreshToken, updateAccessToken } from "../models/users.js";

export default async (req, res) => {
  const cookies = req.cookies;
  if (!cookies.jwt) return res.sendStatus(401);
  
  const refreshToken = cookies.jwt;

  const [foundUser] = await getUserByRefreshToken(refreshToken).then(users => users[0]);
  if(!foundUser) return res.sendStatus(403);
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async(err, decoded) => {
    if (err || foundUser.username !== decoded.username) return res.sendStatus(403);
    const accessToken = jwt.sign(
      {
        "UserInfo": {
          "username": decoded.username,
          "role": foundUser.role
        }
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "30s" }
    );
    await updateAccessToken(foundUser.user_id, accessToken)
    res.json({ user_id: foundUser.user_id, role: foundUser.role, accessToken })
  });
}