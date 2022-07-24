import express from "express"
import login from "../controllers/login.js"

export default express.Router().post('/', login);