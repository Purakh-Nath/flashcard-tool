import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = ({ onLogin }) => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        if (!username || !password) {
            alert('Please fill out all fields');
            return;
        }

        try {
            const response = await axios.post('https://flashcard-backend-ivory.vercel.app/api/login', { username, password });
            const { token } = response.data;
            localStorage.setItem('token', token);
            onLogin(token);
            alert('Login successful');
            navigate('/dashboard');
        } catch (error) {
            alert('Invalid credentials');
        }
    };

    return (
        <div className="p-4 bg-gray-800 text-white rounded-lg space-y-4">
            <h2 className="text-xl font-semibold">Login</h2>
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
            <button onClick={handleLogin} className="w-full bg-blue-600 p-2 rounded text-white">Login</button>
        </div>
    );
};

export default Login;
