
import React, { useState } from 'react';

const Flashcard = ({ flashcard }) => {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      onClick={() => setFlipped(!flipped)}
      className="w-96 h-60 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-lg shadow-lg  p-6 flex items-center justify-center text-center cursor-pointer transform transition-transform duration-500 hover:scale-105"
      style={{ transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
      
    >
      <div
        className="text-lg font-medium"
        style={{ transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
      >
        {flipped ? flashcard.answer : flashcard.question}
      </div>
    </div>
  );
};

export default Flashcard;


