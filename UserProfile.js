// frontend/src/components/UserProfile.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserProfile = () => {
    const [user, setUser] = useState(null);
    const email = "user@example.com"; // Replace with dynamic email if necessary

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`/api/users/${email}`);
                setUser(response.data);
            } catch (error) {
                console.error("Error fetching user:", error);
                // Set some mock data for testing
                setUser({
                    name: "John Doe",
                    preferences: {
                        seat: "Aisle",
                        meal: "Vegetarian",
                    }
                });
            }
        };
        fetchUser();
    }, [email]);

    return (
        <div style={{ textAlign: 'center', color: 'white' }}>
            {user ? (
                <div>
                    <h1>Welcome, {user.name}</h1>
                    <h2>Your Preferences:</h2>
                    <pre>{JSON.stringify(user.preferences, null, 2)}</pre>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default UserProfile;
