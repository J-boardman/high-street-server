import { createNewBooking, deleteBookingById, getAllBookings, getBookingsByClassId, getBookingsByCustomerId, getBookingById, getBookingsByTrainerId, checkDuplicateBookings } from "../models/bookings.js"
import { changeClassAvailability, getClassAvailability } from "../models/classes.js";

export const createBooking = async(req, res) => {
  const { customer_id, class_id } = req.body;
  
  try {
    // Check if there is any class availability
    const [availability] = await getClassAvailability(class_id).then(arr => arr[0]);
    const { spots_available } = availability;
    if(spots_available <= 0) return res.status(409).json({"Message": "No availability for this class."})

    // Check if customer has already booked this class
    const [duplicateBooking] = await checkDuplicateBookings(customer_id, class_id);
    if(duplicateBooking.length) return res.status(409).json({"Message": "Customer has already made booking for this class."})
    
    // Make booking
    await changeClassAvailability(spots_available - 1, class_id);
    const [results] = await createNewBooking(customer_id, class_id);
    res.status(200).json({
      message: `Booking made with the ID: ${results.insertId}`,
      availability: `Class availability altered: ${spots_available} => ${spots_available - 1}` 
    });
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

export const getBooking = async(req, res) => {
  try {
    const [booking] = await getBookingById(req.params.id).then(x => x[0]);
    if(!booking) return res.status(204).json({"Message": "No bookings found"})
    res.status(200).json(booking);
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
    const [foundClass] = await getBookingById(id).then(x => x[0]);
    const [availability] = await getClassAvailability(foundClass.class_id).then(arr => arr[0]);
    const { spots_available } = availability;
    await changeClassAvailability(spots_available + 1, foundClass.class_id);
    const [results] = await deleteBookingById(id);
    if(results.affectedRows > 0)
      res.status(200).json({
        message: `Booking with the ID: ${id} has been deleted`,
        availability: `Class availability altered: ${spots_available} => ${spots_available + 1}` 
      });
  
  } catch (error) {
    console.log(error.message)
  }
};

