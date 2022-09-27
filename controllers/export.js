import express from "express"
import fs from "fs"
import ejs from "ejs"
import { getJustBookingsByClassID } from "../models/bookings.js"
import { getClasses } from "../models/classes.js"
import { getUserById } from "../models/users.js"


export const exportBookings = async(req, res) => {
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
      const {customer_id, booking_id } = booking;
      const [[customer]] = await getUserById(customer_id);
      booking.customer = {
        name: `${customer.firstname} ${customer.lastname}`,
        username: customer.username
      };
    }
    classListing.bookings = bookings;
  }

  // const xml = ejs.render(
  //   fs.readFileSync("./views/classes.ejs"),
  //   { classListings: classListings}
  // );
  res.status(200).render("classes.ejs", { classListings: classListings })
}