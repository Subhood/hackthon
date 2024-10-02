// backend/server.js
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 5000;

app.use(bodyParser.json());

let flights = [
    { flightNumber: 'AA123', destination: 'New York', date: '2024-10-10', time: '10:00 AM' },
    { flightNumber: 'BA456', destination: 'London', date: '2024-10-11', time: '02:00 PM' },
    { flightNumber: 'CA789', destination: 'Tokyo', date: '2024-10-12', time: '06:00 PM' },
];

// Array to store booking details
let bookings = [];

// Endpoint to get available flights
app.get('/api/flights', (req, res) => {
    res.json(flights);
});

// Endpoint to book a flight
app.post('/api/book', (req, res) => {
    const { flightNumber, passengerName, passengerEmail } = req.body;
    
    if (!flightNumber || !passengerName || !passengerEmail) {
        return res.status(400).json({ message: 'Please provide flight number, passenger name, and email.' });
    }

    const flight = flights.find(f => f.flightNumber === flightNumber);
    if (!flight) {
        return res.status(404).json({ message: 'Flight not found' });
    }

    // Generate a unique ticket number
    const ticketNumber = `TICKET-${Math.floor(Math.random() * 100000)}`;

    // Store booking details
    bookings.push({
        flightNumber,
        passengerName,
        passengerEmail,
        ticketNumber,
    });

    res.status(201).json({ message: 'Booking successful', ticketNumber });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
