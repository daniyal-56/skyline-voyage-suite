import { readDB, writeDB } from '../utils/dbHandler.js';

export const createBooking = (req, res) => {
    const { email, flightId, seats, classes, total } = req.body;
    const db = readDB();

    const flight = db.flights.find(f => f.id === flightId);
    if (!flight) return res.status(404).json({ message: "Flight not found" });

    // Validate seat availability
    const seatList = seats.split(',');
    if (flight.seats < seatList.length) {
        return res.status(400).json({ message: "Not enough seats available" });
    }

    const newBooking = {
        id: `SL-2026-${Math.floor(10000 + Math.random() * 90000)}`,
        userId: email,
        flightId: flight.id,
        from: flight.from,
        to: flight.to,
        fromCity: "New York", 
        toCity: "London",
        date: "Jun 15, 2026",
        seat: seats,
        status: "upcoming",
        price: `$${total}`
    };

    // Decrease available seats
    flight.seats -= seatList.length;
    db.bookings.push(newBooking);

    writeDB(db);
    res.status(201).json({ message: "Booking confirmed", booking: newBooking });
};

export const getUserBookings = (req, res) => {
    const { email } = req.params;
    const db = readDB();
    
    const userBookings = db.bookings.filter(b => b.userId === email);
    res.status(200).json(userBookings);
};