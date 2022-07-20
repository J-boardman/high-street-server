import allowedOrigins from "../config/allowedOrigins.js";

export default (req, res, next) => {
  if(allowedOrigins.includes(req.headers.origin)){
    res.header('Access-Control-Allow-Credentials', true)
  }
  next();
};