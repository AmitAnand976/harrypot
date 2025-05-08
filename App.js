import React, { useState } from 'react';

const questions = [
  {
    question: 'What would you do if you find a wallet on the ground?',
    options: [
      { text: 'Return it right away', house: 'Hufflepuff' },
      { text: 'Keep the cash, leave the rest', house: 'Slytherin' },
      { text: 'Try to find the owner yourself', house: 'Gryffindor' },
      { text: 'Use clues to figure out the owner', house: 'Ravenclaw' },
    ],
  },
  {
    question: 'Which quality do you value most?',
    options: [
      { text: 'Intelligence', house: 'Ravenclaw' },
      { text: 'Bravery', house: 'Gryffindor' },
      { text: 'Kindness', house: 'Hufflepuff' },
      { text: 'Ambition', house: 'Slytherin' },
    ],
  },
  {
    question: 'What would you do during a school competition?',
    options: [
      { text: 'Compete fearlessly', house: 'Gryffindor' },
      { text: 'Strategize every move', house: 'Ravenclaw' },
      { text: 'Do what it takes to win', house: 'Slytherin' },
      { text: 'Support your team no matter what', house: 'Hufflepuff' },
    ],
  },
];

const houseImages = {
  Gryffindor: 'https://i.pinimg.com/originals/6e/66/9b/6e669b16fae060f27db8cdbaff171d35.png',
  Hufflepuff: 'https://i.pinimg.com/originals/4b/3e/d5/4b3ed5e1a60aa4b885e81c260014e4a3.png',
  Ravenclaw: 'https://i.pinimg.com/originals/cb/6e/32/cb6e32456c59b604b189d14849bb7f0e.png',
  Slytherin: 'https://i.pinimg.com/originals/71/33/00/7133001eb1b3e0658dfc21c745913733.png',
};

export default function HarryPotterQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [scores, setScores] = useState({ Gryffindor: 0, Hufflepuff: 0, Ravenclaw: 0, Slytherin: 0 });
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (house) => {
    setScores((prev) => ({ ...prev, [house]: prev[house] + 1 }));
    const next = currentQuestion + 1;
    if (next < questions.length) {
      setCurrentQuestion(next);
    } else {
      setShowResult(true);
    }
  };

  const getResult = () => {
    return Object.keys(scores).reduce((a, b) => (scores[a] > scores[b] ? a : b));
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScores({ Gryffindor: 0, Hufflepuff: 0, Ravenclaw: 0, Slytherin: 0 });
    setShowResult(false);
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-xl shadow-md text-center">
      <h1 className="text-3xl font-bold mb-6 text-purple-700">Which Hogwarts House Are You?</h1>
      {showResult ? (
        <div>
          <p className="text-xl mb-4">You belong to <span className="font-bold">{getResult()}</span>! 🧙‍♂️</p>
          <img
            src={houseImages[getResult()]}
            alt={`${getResult()} crest`}
            className="mx-auto rounded-lg w-40"
          />
          <button
            onClick={resetQuiz}
            className="mt-6 bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
          >
            Restart Quiz
          </button>
        </div>
      ) : (
        <div>
          <h2 className="text-xl font-semibold mb-4">{questions[currentQuestion].question}</h2>
          {questions[currentQuestion].options.map((option, idx) => (
            <button
              key={idx}
              onClick={() => handleAnswer(option.house)}
              className="block w-full text-left bg-purple-100 hover:bg-purple-200 text-black font-medium py-2 px-4 my-2 rounded"
            >
              {option.text}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
