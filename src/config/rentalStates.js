/**
 * Booked = user created rental
 * Accepted = backoffice acceptd the rental
 * Ongoing = user picked up the item rental
 * Expired = user is late to return the item
 * Returned = item returned and rent payed
 */
const rentalStates = ["Booked", "Accepted", "Ongoing", "Expired", "Returned"];
  
module.exports = rentalStates;