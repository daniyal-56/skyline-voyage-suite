import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import * as flightController from './controllers/flightController.js';
import * as bookingController from './controllers/bookingController.js';
import * as dashboardController from './controllers/dashboardController.js';
import * as authController from './controllers/authController.js'; // 👈 NEW
import { verifyToken, requireRole } from './middleware/authMiddleware.js'; // 👈 NEW

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// --- Authentication Endpoints (Public) ---
app.post('/api/auth/register', authController.register);
app.post('/api/auth/login', authController.login);

// --- Flight Endpoints (Public) ---
app.get('/api/flights', flightController.getFlights);

// --- Booking Endpoints ---
app.post('/api/bookings', bookingController.createBooking);
app.get('/api/bookings/:email', verifyToken, bookingController.getUserBookings); // Protected

// --- Dashboard Endpoints (PROTECTED WITH ROLES) ---
// Only users with a valid token AND the 'admin' role can access stats
app.get('/api/admin/stats', verifyToken, requireRole('admin'), dashboardController.getAdminStats);

// Only users with a valid token AND the 'staff' role can access departures
app.get('/api/staff/flights', verifyToken, requireRole('staff'), dashboardController.getStaffFlights);

app.listen(PORT, () => {
    console.log(`Skyline Airways Backend running securely at http://localhost:${PORT}`);
});