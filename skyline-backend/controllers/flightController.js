import { readDB } from '../utils/dbHandler.js';

export const getFlights = (req, res) => {
    const db = readDB();
    const { from, to } = req.query;

    let filteredFlights = db.flights;

    if (from) {
        filteredFlights = filteredFlights.filter(f => f.from.toLowerCase() === from.toLowerCase());
    }
    if (to) {
        filteredFlights = filteredFlights.filter(f => f.to.toLowerCase() === to.toLowerCase());
    }

    res.status(200).json(filteredFlights);
};