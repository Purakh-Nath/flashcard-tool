
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Dashboard = ({ token }) => {
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const [flashcards, setFlashcards] = useState([]);
    const [selectedCard, setSelectedCard] = useState(null);
    const navigate = useNavigate();

    const handleUpdate = async () => {
        if (!question || !answer) {
            alert('Both question and answer fields are required.');
            return;
        }
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                alert('Please log in to update flashcards');
                return;
            }

            const response = await axios.put(
                `/api/flashcards/${selectedCard.id}`,
                { question, answer },
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );
            alert('Flashcard updated successfully');
            setFlashcards(flashcards.map(card =>
                card.id === selectedCard.id ? { ...card, question, answer } : card
            ));
            setSelectedCard(null);
            setQuestion('');
            setAnswer('');
        } catch (error) {
            console.error('Error updating flashcard:', error);
            alert(`Error updating flashcard: ${error.message}`);
            if (error.response && error.response.status === 403) {
                alert('Your session has expired. Please log in again.');
                navigate('/login');
            }
        }
    };

    const handleAdd = async () => {
        if (!question || !answer) {
            alert('Both question and answer fields are required.');
            return;
        }
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                alert('Please log in to add flashcards');
                return;
            }

            const response = await axios.post(
                '/api/flashcards',
                { question, answer },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            alert('Flashcard added successfully');
            setFlashcards([...flashcards, response.data]);
            setQuestion('');
            setAnswer('');
        } catch (error) {
            console.error('Error adding flashcard:', error);
            alert(`Error adding flashcard: ${error.message}`);
            if (error.response && error.response.status === 403) {
                alert('Your session has expired. Please log in again.');
            }
        }
    };

    const handleEdit = (card) => {
        setSelectedCard(card);
        setQuestion(card.question);
        setAnswer(card.answer);
    };

    const handleDelete = (id) => {
        const token = localStorage.getItem('token');
        if (!token) {
            alert('Please log in to delete flashcards');
            return;
        }
        axios.delete(`/api/flashcards/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(() => {
                alert('Flashcard deleted successfully');
                setFlashcards(flashcards.filter(card => card.id !== id));
                setSelectedCard(null);
            })
            .catch(error => {
                console.error('Error deleting flashcard:', error);
                if (error.response && error.response.status === 403) {
                    alert('Your session has expired. Please log in again.');
                    navigate('/login');
                }
            });
    };

    useEffect(() => {
        if (!token) {
            navigate('/login');
        } else {
            axios.get('/api/flashcards', {
                headers: { Authorization: `Bearer ${token}` }
            })
                .then(response => setFlashcards(response.data))
                .catch(error => {
                    console.error('Error fetching flashcards:', error);
                    if (error.response && error.response.status === 403) {
                        alert('Your session has expired. Please log in again.');
                        navigate('/login');
                    }
                });
        }
    }, [token, navigate,handleAdd,handleUpdate]);

    return (
        <div className="p-4 bg-gray-800 text-white shadow-lg rounded-lg space-y-4">
            <h2 className="text-xl font-semibold">Admin Dashboard</h2>

            <input 
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Question"
                className="w-full px-4 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Answer"
                className="w-full px-4 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
                onClick={selectedCard ? handleUpdate : handleAdd}
                className="w-full px-4 py-2 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition"
            >
                {selectedCard ? 'Update Flashcard' : 'Add Flashcard'}
            </button>

            <h3 className="text-lg font-medium">Flashcards</h3>
            <ul className="space-y-2">
    {flashcards.map(card => (
        <li key={card.id} className="flex justify-between items-center p-2 border border-gray-600 rounded-lg bg-gray-700">
            <div>{card.question}</div>
            <div className="flex space-x-2">
                <button
                    onClick={() => handleEdit(card)}
                    className="px-4 py-2 bg-yellow-600 text-white rounded-lg shadow-md hover:bg-yellow-700 transition"
                >
                    Edit
                </button>
                <button
                    onClick={() => handleDelete(card.id)}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-700 transition"
                >
                    Delete
                </button>
            </div>
        </li>
    ))}
</ul>

        </div>
    );
};

export default Dashboard;
