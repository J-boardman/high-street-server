import { createNewBooking, deleteBookingById, getAllBookings, getBookingsByClassId, getBookingsByCustomerId, getBookingsByTrainerId } from "../models/bookings.js"

export const createBooking = async(req, res) => {
  const { customer_id, class_id } = req.body;
  
  try {
    const [results] = await createNewBooking(customer_id, class_id);
    res.status(200).json({message: `Booking made with the ID: ${results.insertId}`});
  } catch (error) {
    res.status(500).json({message: "Failed to make booking."})
    console.log(error);
  }
}

export const getBookings = async(req, res) => {
  try {
    const [bookings] = await getAllBookings()
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({message: "Failed to get bookings"});
    console.log(error)
  } 
}

export const getBookingsByCustomer = async(req, res) => {
  if(!req?.params?.id) return res.status(400).json({"Message": "Booking ID required"});
  try {
    const [bookings] = await getBookingsByCustomerId(req.params.id);
    if(!bookings.length) return res.status(204).json({"Message": "No Bookings found"});
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Failed to get bookings" });
    console.log(error)
  }
}

export const getBookingsByTrainer = async(req, res) => {
  if(!req?.params?.id) return res.status(400).json({"Message": "Booking ID required"});
  try {
    const [bookings] = await getBookingsByTrainerId(req.params.id);
    if(!bookings.length) return res.status(204).json({"Message": "No Bookings found"});
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Failed to get bookings" });
    console.log(error)
  }
}

export const getBookingsByClass = async(req, res) => {
  if(!req?.params?.id) return res.status(400).json({"Message": "Booking ID required"});
  try {
    const [bookings] = await getBookingsByClassId(req.params.id);
    if(!bookings.length) return res.status(204).json({"Message": "No Bookings found"});
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Failed to get bookings" });
    console.log(error)
  }
}

export const deleteBooking = async(req, res) => {
  if(!req?.body?.id) return res.status(400).json({"Message": "Booking ID required"});
  const { id } = req.body;
  try {
    const [results] = await deleteBookingById(id);
    if(results.affectedRows > 0) return res.json({"Message": `Booking ID: ${id} has been deleted.`})
  } catch (error) {
    console.log(error.message)
  }
}