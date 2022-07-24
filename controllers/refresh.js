import jwt from "jsonwebtoken"
import { getUserByToken } from "../models/users";

export default async (req, res) => {
  const cookies = req.cookies;
  if (!cookies.jwt) return res.sendStatus(401);
  
  const refreshToken = cookies.jwt;

  const [foundUser] = await getUserByToken(refreshToken);
  if(!foundUser) return res.sendStatus(403);

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
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
    res.json({ accessToken })
  });
}