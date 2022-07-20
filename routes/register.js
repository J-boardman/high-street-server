import express from "express"
import register from "../controllers/register.js"

export default express.Router().post('/', register);