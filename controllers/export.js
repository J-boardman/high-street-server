import fs from "fs"
import ejs from "ejs"
import { getBookingsByClassId, getBookingsByCustomerId, getJustBookingsByClassID } from "../models/bookings.js"
import { getClasses } from "../models/classes.js"
import { getUserById, getUsers } from "../models/users.js"


export const exportClasses = async(req, res) => {
  const [classListings] = await getClasses();
  if(!classListings) return res.status(500).json({message: "No classes found."})

  for(let classListing of classListings ){
    const { class_id, trainer_id } = classListing
    
    const [[trainer]] = await getUserById(trainer_id);
    classListing.trainer = {
      name: `${trainer.firstname} ${trainer.lastname}`,
      username: trainer.username
    };
    
    const [bookings] = await getJustBookingsByClassID(class_id);
    for (let booking of bookings){
      const [[customer]] = await getUserById(booking.customer_id);
      booking.customer = {
        name: `${customer.firstname} ${customer.lastname}`,
        username: customer.username
      };
    }
    classListing.bookings = bookings;
  }

   // Generate XML document using template
   const xml = ejs.render(fs.readFileSync("./views/classes.ejs").toString(), { classListings });

  // Send XML as download
  res.status(200)
    .header("Content-Disposition", 'attachment; filename="classes.xml"')
    .header("Content-Type", "application/xml")
    .send(xml);
}

export const exportUserList = async(req, res) => {
  try {
    const [users] = await getUsers();
    if(!users) return res.status(204).json({message: "No users found"});
    // Generate XML document using template
    const xml = ejs.render(fs.readFileSync("./views/users.ejs").toString(), { users });

    // Send XML as download
    res.status(200)
      .header("Content-Disposition", 'attachment; filename="users.xml"')
      .header("Content-Type", "application/xml")
      .send(xml);
  } 
  
  catch (error) {
    console.log(error)    
  }
}


export const exportCustomerBookings = async(req, res) => {
  if(!req?.params?.id) return res.status(400).json({message: "Customer ID required"});
  try {
    const [bookings] = await getBookingsByCustomerId(req.params.id);
    if(!bookings.length) return res.status(204).json({message: "No Bookings found"});
    
    // Generate XML document using template
    const xml = ejs.render(fs.readFileSync("./views/customer-bookings.ejs").toString(), { bookings });

    // Send XML as download
    res.status(200)
      .header("Content-Disposition", 'attachment; filename="customer-bookings.xml"')
      .header("Content-Type", "application/xml")
      .send(xml);

    } catch (error) {
    res.status(500).json({ message: "Failed to get bookings" });
    console.log(error)
  }
}

export const exportTrainerBookings = async(req, res) => {
  if(!req?.params?.id) return res.status(400).json({message: "Booking ID required"});
  try {
    const [bookings] = await getBookingsByClassId(req.params.id);
    if(!bookings.length) return res.status(204).json({message: "No Bookings found"});
    
    // Generate XML document using template
    const xml = ejs.render(fs.readFileSync("./views/trainer-bookings.ejs").toString(), { bookings });

    // Send XML as download
    res.status(200)
      .header("Content-Disposition", 'attachment; filename="trainer-bookings.xml"')
      .header("Content-Type", "application/xml")
      .send(xml);

  } catch (error) {
    res.status(500).json({ message: "Failed to get bookings" });
    console.log(error)
  }
}