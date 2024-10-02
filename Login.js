// frontend/src/components/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault();

        if (email === '' || password === '') {
            setError('Email and password are required.');
            return;
        }

        // Here you would typically send a request to your backend to authenticate the user.
        setError('');
        alert(`Welcome, ${email}!`);
        navigate('/home'); // Redirect to home page after successful login
    };

    return (
        <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            height: '100vh', 
            background: '#34495e' // Background color for the login page
        }}>
            <form 
                onSubmit={handleLogin} 
                style={{
                    background: '#2c3e50', // Darker background for the form
                    padding: '20px', 
                    borderRadius: '10px', 
                    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.5)', 
                    width: '300px', 
                    color: 'white'
                }}
            >
                <h2 style={{ textAlign: 'center' }}>Login</h2>
                {error && <p style={{ color: 'red' }}>{error}</p>}
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
                    Login
                </button>
                <div style={{ textAlign: 'center', marginTop: '10px' }}>
                    <p style={{ color: 'white' }}>
                        Don't have an account? 
                        <button 
                            onClick={() => navigate('/signup')} // Navigate to Sign Up page
                            style={{
                                background: 'none',
                                border: 'none',
                                color: '#28a745',
                                cursor: 'pointer',
                                textDecoration: 'underline'
                            }}
                        >
                            Sign Up
                        </button>
                    </p>
                </div>
            </form>
        </div>
    );
};

export default Login;
