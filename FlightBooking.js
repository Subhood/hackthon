// frontend/src/components/FlightBooking.js
import React, { useEffect, useState } from 'react';
import './FlightBooking.css'; // Import the CSS for flight booking

const FlightBooking = () => {
    const [flights, setFlights] = useState([]);
    const [selectedFlight, setSelectedFlight] = useState(null);
    const [passengerName, setPassengerName] = useState('');
    const [passengerEmail, setPassengerEmail] = useState('');
    const [message, setMessage] = useState('');

    // Fetch available flights from the backend
    useEffect(() => {
        const fetchFlights = async () => {
            const response = await fetch('/api/flights');
            const data = await response.json();
            setFlights(data);
        };
        fetchFlights();
    }, []);

    // Handle flight booking submission
    const handleBooking = async (event) => {
        event.preventDefault();

        if (!selectedFlight || !passengerName || !passengerEmail) {
            setMessage('Please fill in all fields and select a flight.');
            return;
        }

        const response = await fetch('/api/book', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                flightNumber: selectedFlight.flightNumber,
                passengerName,
                passengerEmail,
            }),
        });

        const result = await response.json();
        if (response.ok) {
            setMessage(`Booking successful! Your ticket number is ${result.ticketNumber}`);
            setPassengerName('');
            setPassengerEmail('');
            setSelectedFlight(null);
        } else {
            setMessage(result.message || 'Booking failed. Please try again.');
        }
    };

    return (
        <div className="flight-booking-container">
            <h2>Book Your Flight</h2>
            <div className="flight-list">
                {flights.length > 0 ? (
                    flights.map((flight) => (
                        <div key={flight.flightNumber} className="flight-item">
                            <input
                                type="radio"
                                id={flight.flightNumber}
                                name="flight"
                                value={flight.flightNumber}
                                onChange={() => setSelectedFlight(flight)}
                            />
                            <label htmlFor={flight.flightNumber}>
                                {flight.flightNumber} - {flight.destination} - {flight.date} - {flight.time}
                            </label>
                        </div>
                    ))
                ) : (
                    <p>No flights available at this time.</p>
                )}
            </div>

            {selectedFlight && (
                <form onSubmit={handleBooking} className="booking-form">
                    <h3>Passenger Details</h3>
                    <input
                        type="text"
                        placeholder="Passenger Name"
                        value={passengerName}
                        onChange={(e) => setPassengerName(e.target.value)}
                        required
                        className="input-field"
                    />
                    <input
                        type="email"
                        placeholder="Passenger Email"
                        value={passengerEmail}
                        onChange={(e) => setPassengerEmail(e.target.value)}
                        required
                        className="input-field"
                    />
                    <button type="submit" className="book-button">
                        Book Flight
                    </button>
                </form>
            )}

            {message && <p className="message">{message}</p>}
        </div>
    );
};

export default FlightBooking;
