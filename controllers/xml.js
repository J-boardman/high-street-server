import { getBookingsByClassId, getBookingsByCustomerId } from "../models/bookings.js";
import { render } from "ejs";
import { getUsers } from "../models/users.js";

export const getCustomerBookingsForXML = async(req, res) => {
  if(!req?.params?.id) return res.status(400).json({"Message": "Booking ID required"});
  try {
    const [bookings] = await getBookingsByCustomerId(req.params.id);
    if(!bookings.length) return res.status(204).json({"Message": "No Bookings found"});
    res.contentType('application/xml');
    res.status(200).render("customer-bookings.ejs", { bookings });
    } catch (error) {
    res.status(500).json({ message: "Failed to get bookings" });
    console.log(error)
  }
}

export const getClassBookingsForXML = async(req, res) => {
  if(!req?.params?.id) return res.status(400).json({"Message": "Booking ID required"});
  try {
    const [bookings] = await getBookingsByClassId (req.params.id);
    if(!bookings.length) return res.status(204).json({"Message": "No Bookings found"});
    res.contentType('application/xml');
    res.status(200).render("trainer-bookings.ejs", { bookings });
    // res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Failed to get bookings" });
    console.log(error)
  }
}

export const getUsersForXML = async(req, res) => {
  try {
    const [users] = await getUsers();
    if(!users) return res.status(204).json({"Message": "No users found"});
    res.contentType('application/xml');
    res.status(200).render("users.ejs", { users });
  } catch (error) {
    console.log(error)    
  }
}