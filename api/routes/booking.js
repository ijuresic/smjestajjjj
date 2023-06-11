const express = require('express');
const router = express.Router();

const {
  createBookings,
  getBookings,
  cancelBooking, // Dodana nova funkcija za otkazivanje rezervacije
} = require('../controllers/bookingController');

router.route('/').get(getBookings).post(createBookings);
router.route('/:id').delete(cancelBooking); // Dodana nova ruta za otkazivanje rezervacije

module.exports = router;
