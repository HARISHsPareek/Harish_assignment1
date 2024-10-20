import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignIn = ({ setToken }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Use navigate for navigation

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/admin/signin', { username, password });
            const { token } = res.data;
            localStorage.setItem('token', token); // Store token in localStorage
        
            setToken(token); // Set the token in state
            setError('');
            navigate('/'); // navigate to home or other page after sign in
        } catch (err) {
            setError('Invalid credentials');
        }
    };

    return (
        <div className="signin">
            <h2>Admin Sign In</h2>
            <form onSubmit={handleSubmit}>
                <label>Username</label>
                <input 
                    type="text" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                    placeholder='admin'
                />
                <label>Password</label>
                <input 
                    type="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    placeholder='admin123'
                />
                <button type="submit">Sign In</button>
                {error && <p className="error">{error}</p>}
            </form>
        </div>
    );
};

export default SignIn;
