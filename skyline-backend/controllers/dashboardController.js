import { readDB } from '../utils/dbHandler.js';

// Calculate Executive Dashboard Stats
export const getAdminStats = (req, res) => {
    const db = readDB();
    const bookings = db.bookings || [];
    const flights = db.flights || [];

    // 1. Calculate Total Revenue from all bookings
    const totalRevenue = bookings.reduce((sum, b) => {
        // Remove the '$' sign and convert to a number
        const price = parseFloat(b.price.replace('$', ''));
        return sum + price;
    }, 0);

    // 2. Calculate Total Tickets Sold
    const ticketsSold = bookings.reduce((sum, b) => {
        return sum + b.seat.split(',').length;
    }, 0);

    // 3. Generate dynamic chart data based on revenue to make it look realistic
    const weeklyRevenue = [
        { name: "Mon", revenue: totalRevenue * 0.1 },
        { name: "Tue", revenue: totalRevenue * 0.15 },
        { name: "Wed", revenue: totalRevenue * 0.05 },
        { name: "Thu", revenue: totalRevenue * 0.2 },
        { name: "Fri", revenue: totalRevenue * 0.25 },
        { name: "Sat", revenue: totalRevenue * 0.15 },
        { name: "Sun", revenue: totalRevenue * 0.1 },
    ];

    res.status(200).json({
        totalRevenue: `$${totalRevenue.toLocaleString()}`,
        ticketsSold,
        activeFlights: flights.length,
        loadFactor: "92%", 
        weeklyRevenue
    });
};

// Calculate Gate Agent (Staff) Departures
export const getStaffFlights = (req, res) => {
    const db = readDB();
    const flights = db.flights || [];
    const bookings = db.bookings || [];

    const staffFlights = flights.map(f => {
        // Find all bookings for this specific flight
        const flightBookings = bookings.filter(b => b.flightId === f.id);
        
        // Count total passengers booked
        const passengers = flightBookings.reduce((sum, b) => sum + b.seat.split(',').length, 0);
        
        return {
            id: f.id,
            dest: f.toCity || f.to,
            time: f.dep,
            gate: `G-${Math.floor(Math.random() * 20) + 1}`, // Random gate assignment
            status: "On Time",
            passengers: passengers,
            capacity: f.seats + passengers // Current available seats + booked seats = total capacity
        };
    });

    res.status(200).json(staffFlights);
};