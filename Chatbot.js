// frontend/src/components/Chatbot.js
import React, { useEffect, useState } from 'react';

const mockDatabase = {
    users: [
        {
            email: "user@example.com",
            name: "John Doe",
            flightDetails: {
                flightNumber: "AB123",
                departure: "2024-10-10 10:00 AM",
                arrival: "2024-10-10 12:00 PM",
                status: "On Time"
            },
            preferences: {
                seat: "Aisle",
                meal: "Vegetarian",
            }
        },
        {
            email: "jane.doe@example.com",
            name: "Jane Doe",
            flightDetails: {
                flightNumber: "XY456",
                departure: "2024-10-12 3:00 PM",
                arrival: "2024-10-12 5:00 PM",
                status: "Delayed"
            },
            preferences: {
                seat: "Window",
                meal: "Non-Vegetarian",
            }
        }
    ]
};

const Chatbot = () => {
    const [isChatbotVisible, setChatbotVisible] = useState(false);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');

    const handleToggleChatbot = () => {
        setChatbotVisible(!isChatbotVisible);
    };

    const handleInputChange = (event) => {
        setInput(event.target.value);
    };

    const handleSendMessage = () => {
        if (!input.trim()) return;

        // Add user message to the chat history
        const newMessage = { text: input, sender: 'user' };
        setMessages((prevMessages) => [...prevMessages, newMessage]);

        // Get chatbot response
        const botResponse = getBotResponse(input);
        setMessages((prevMessages) => [...prevMessages, botResponse]);

        // Clear input field
        setInput('');
    };

    const getBotResponse = (input) => {
        // Extract email from input if possible
        const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
        const emailMatch = input.match(emailRegex);
        const userEmail = emailMatch ? emailMatch[0] : null;

        // Check if we found a user
        if (userEmail) {
            const user = mockDatabase.users.find(user => user.email === userEmail);
            if (user) {
                return {
                    text: `Hi ${user.name}, here are your flight details:\n- Flight Number: ${user.flightDetails.flightNumber}\n- Departure: ${user.flightDetails.departure}\n- Arrival: ${user.flightDetails.arrival}\n- Status: ${user.flightDetails.status}\n\nYour preferences:\n- Seat: ${user.preferences.seat}\n- Meal: ${user.preferences.meal}`,
                    sender: 'bot'
                };
            } else {
                return {
                    text: "Sorry, I couldn't find your details. Please ensure your email is correct.",
                    sender: 'bot'
                };
            }
        }

        // Generic responses for common queries
        const responses = {
            "hi": "Hello! How can I assist you today?",
            "how are you?": "I'm just a program, but thanks for asking!",
            "what is your name?": "I'm your friendly chatbot here to assist you.",
            "default": "I'm sorry, I didn't understand that."
        };

        return {
            text: responses[input.toLowerCase()] || responses["default"],
            sender: 'bot'
        };
    };

    return (
        <div style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 1000 }}>
            <button
                onClick={handleToggleChatbot}
                style={{
                    padding: '10px 20px',
                    backgroundColor: '#007bff',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer'
                }}
            >
                {isChatbotVisible ? 'Hide Chatbot' : 'Chat with Us'}
            </button>

            {isChatbotVisible && (
                <div style={{
                    marginTop: '10px',
                    background: '#2c3e50', // Dark background color
                    color: 'white', // Light text color
                    borderRadius: '10px',
                    padding: '20px',
                    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.5)',
                    width: '300px',
                    maxHeight: '400px',
                    overflowY: 'scroll',
                }}>
                    <h2 style={{ margin: 0 }}>Chatbot</h2>
                    <div style={{ maxHeight: '300px', overflowY: 'auto', marginBottom: '10px' }}>
                        {messages.map((msg, index) => (
                            <div key={index} style={{ textAlign: msg.sender === 'user' ? 'right' : 'left' }}>
                                <strong style={{ color: msg.sender === 'user' ? '#f39c12' : '#1abc9c' }}>{msg.sender === 'user' ? 'You' : 'Bot'}:</strong>
                                <span style={{ color: 'white' }}> {msg.text}</span>
                            </div>
                        ))}
                    </div>
                    <input
                        type="text"
                        value={input}
                        onChange={handleInputChange}
                        placeholder="Type a message..."
                        style={{
                            width: '70%',
                            padding: '10px',
                            borderRadius: '5px',
                            border: '1px solid #ccc',
                            marginRight: '10px',
                            background: '#34495e', // Darker input background
                            color: 'white' // Light text color
                        }}
                    />
                    <button
                        onClick={handleSendMessage}
                        style={{
                            padding: '10px 15px',
                            backgroundColor: '#28a745',
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer',
                        }}
                    >
                        Send
                    </button>
                </div>
            )}
        </div>
    );
};

export default Chatbot;
