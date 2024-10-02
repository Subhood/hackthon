// frontend/src/components/Home.js
import React from 'react';
import FlightBooking from './FlightBooking'; // Import the FlightBooking component
import Chatbot from './Chatbot'; // Import the Chatbot component

const Home = () => {
    return (
        <div>
            <h1>Welcome to the Airline Booking System</h1>
            <FlightBooking /> {/* Show flight booking options */}
            <Chatbot /> {/* Chatbot component */}
        </div>
    );
};

export default Home;
