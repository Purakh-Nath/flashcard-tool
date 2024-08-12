
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Flashcard from './Flashcard';

const List = () => {
    const [flashcards, setFlashcards] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const fetchFlashcards = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    alert('Please log in to view flashcards');
                    return;
                }
        
                const response = await axios.get('https://flashcard-backend-ivory.vercel.app/api/flashcards', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setFlashcards(response.data);
            } catch (error) {
                console.error('Error fetching flashcards:', error);
                alert(`Error fetching flashcards: ${error.message}`);
                if (error.response && error.response.status === 403) {
                    alert('Your session has expired. Please log in again.');
                    // Optionally, redirect to the login page
                }
            }
        };
        

        fetchFlashcards();
    }, []);

    const nextCard = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % flashcards.length);
    };

    const prevCard = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? flashcards.length - 1 : prevIndex - 1
        );
    };

    return (
        <div className="flex flex-col items-center space-y-6 text-yellow-50 font-semibold">
            {flashcards.length > 0 ? (
                <Flashcard flashcard={flashcards[currentIndex]} />
            ) : (
                <p>No flashcards available. Please visit the Dashboard to add some.</p>
            )}
            <div className="space-x-4">
                <button
                    onClick={prevCard}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-700 transition"
                >
                    Previous
                </button>
                <button
                    onClick={nextCard}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-700 transition"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default List;
