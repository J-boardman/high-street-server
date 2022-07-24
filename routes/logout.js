import express from "express"
import logout from "../controllers/logout.js"

export default express.Router().get('/', logout);