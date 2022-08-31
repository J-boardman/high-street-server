import express from "express"
import { getClassBookingsForXML, getCustomerBookingsForXML, getUsersForXML } from "../controllers/xml.js";

const router = express.Router()

router.route("/customer/:id").get(getCustomerBookingsForXML);
router.route("/trainer/:id").get(getClassBookingsForXML)
router.route("/admin").get(getUsersForXML)


export default router;

