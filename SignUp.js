// frontend/src/components/SignUp.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSignUp = async (event) => {
        event.preventDefault();

        if (email === '' || password === '' || name === '') {
            setError('All fields are required.');
            return;
        }

        // Here, you would typically send a request to your backend to create a new account.
        // For now, let's assume the account is created successfully.
        setError('');
        alert(`Account created successfully for ${name}!`);
        navigate('/'); // Redirect to login page after successful sign up
    };

    return (
        <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            height: '100vh', 
            background: '#34495e' // Background color for the signup page
        }}>
            <form 
                onSubmit={handleSignUp} 
                style={{
                    background: '#2c3e50', // Darker background for the form
                    padding: '20px', 
                    borderRadius: '10px', 
                    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.5)', 
                    width: '300px', 
                    color: 'white'
                }}
            >
                <h2 style={{ textAlign: 'center' }}>Sign Up</h2>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <div style={{ marginBottom: '15px' }}>
                    <input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        style={{
                            width: '100%', 
                            padding: '10px', 
                            borderRadius: '5px', 
                            border: '1px solid #ccc',
                            marginBottom: '10px',
                            background: '#34495e',
                            color: 'white'
                        }}
                    />
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={{
                            width: '100%', 
                            padding: '10px', 
                            borderRadius: '5px', 
                            border: '1px solid #ccc',
                            marginBottom: '10px',
                            background: '#34495e',
                            color: 'white'
                        }}
                    />
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={{
                            width: '100%', 
                            padding: '10px', 
                            borderRadius: '5px', 
                            border: '1px solid #ccc',
                            marginBottom: '10px',
                            background: '#34495e',
                            color: 'white'
                        }}
                    />
                </div>
                <button 
                    type="submit"
                    style={{
                        width: '100%', 
                        padding: '10px', 
                        backgroundColor: '#28a745', 
                        color: 'white', 
                        border: 'none', 
                        borderRadius: '5px', 
                        cursor: 'pointer'
                    }}
                >
                    Sign Up
                </button>
            </form>
        </div>
    );
};

export default SignUp;
