import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSignup = async () => {
        if (!username || !password) {
            alert('Please fill out all fields');
            return;
        }

        try {
            await axios.post('https://flashcard-backend-ivory.vercel.app/api/register', { username, password });
            alert('User registered successfully');
            navigate('/dashboard'); // Redirect to the dashboard after successful signup
        } catch (error) {
            alert('Error registering user');
        }
    };

    return (
        <div className="p-4 bg-gray-800 text-white rounded-lg space-y-4">
            <h2 className="text-xl font-semibold">Sign Up</h2>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-2 rounded bg-gray-700 text-white"
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 rounded bg-gray-700 text-white"
            />
            <button onClick={handleSignup} className="w-full bg-green-600 p-2 rounded text-white">Sign Up</button>
        </div>
    );
};

export default Signup;

