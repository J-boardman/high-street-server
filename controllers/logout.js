import { getUserByToken, UpdateRefreshToken } from "../models/users.js";

export default async (req, res) => {
  // Delete access token on client as well!

  const { cookies } = req;
  if(!cookies?.jwt) return res.sendStatus(204);
  
  const refreshToken = cookies.jwt;
  const [foundUser] = await getUserByToken(refreshToken).then(users => users[0]);

  if(!foundUser) {
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
    return res.sendStatus(204)
  };

  // Delete refreshToken in database
  await UpdateRefreshToken(foundUser.user_id, null);
  
  res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
  res.sendStatus(204)
}