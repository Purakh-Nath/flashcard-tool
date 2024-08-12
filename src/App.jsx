
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import List from './components/List';
import Login from './components/Login';
import Signup from './components/Signup';

function App() {
    const [token, setToken] = useState(localStorage.getItem('token'));

    const handleLogout = () => {
        localStorage.removeItem('token');
        setToken(null);
    };

    return (
        <Router>
            <div className="min-h-screen bg-gray-900 flex flex-col items-center">
                <header className="bg-gray-800 text-white w-full p-4 shadow-md">
                    <nav className="flex justify-between items-center max-w-6xl mx-auto">
                        <h1 className="text-3xl font-bold md:-ml-44 sm:-ml-2">
                            <Link to="/" className="text-white hover:text-gray-300 transition">
                                Flashcard Learning Tool
                            </Link>
                        </h1>
                        <div className="space-x-7 font-bold text-lg">
                            {token ? (
                                <>
                                    <Link to="/" className=" text-gray-300 hover:text-white transition">
                                        Home
                                    </Link>
                                    <Link to="/dashboard" className="font-bold text-lg text-gray-300 hover:text-white transition">
                                        Dashboard
                                    </Link>
                                    <button onClick={handleLogout} className="font-bold text-lg text-gray-300 hover:text-white transition">
                                        Logout
                                    </button>
                                </>
                            ) : (
                                <>
                                    <Link to="/login" className="text-gray-300 hover:text-white transition">
                                        Login
                                    </Link>
                                    <Link to="/signup" className="text-gray-300 hover:text-white transition">
                                        Sign Up
                                    </Link>
                                </>
                            )}
                        </div>
                    </nav>
                </header>
                <main className="flex-1 w-full max-w-6xl mx-auto p-6">
                    <Routes>
                        <Route path="/dashboard" element={token ? <Dashboard token={token} /> : <Navigate to="/login" />} />
                        <Route path="/login" element={<Login onLogin={setToken} />} />
                        <Route path="/signup" element={<Signup />} />
                        <Route path="/" element={<List token={token} />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
}

export default App;
