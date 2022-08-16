import express from "express";
import refresh from "../controllers/refresh.js";

export default express.Router().get('/', refresh);