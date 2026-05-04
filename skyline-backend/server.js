import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import * as flightController from './controllers/flightController.js';
import * as bookingController from './controllers/bookingController.js';

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// Flight Endpoints
app.get('/api/flights', flightController.getFlights);

// Booking Endpoints
app.post('/api/bookings', bookingController.createBooking);
app.get('/api/bookings/:email', bookingController.getUserBookings);

app.listen(PORT, () => {
    console.log(`Skyline Airways Backend running at http://localhost:${PORT}`);
});