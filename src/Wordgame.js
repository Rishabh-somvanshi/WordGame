import React, { useState, useEffect } from 'react';
import axios from 'axios';

const WordGame = () => {
  const [words, setWords] = useState([]);
  const [wordToBeGuessed, setWordToBeGuessed] = useState('');
  const [guess, setGuess] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [result, setResult] = useState('');

  useEffect(() => {
    const fetchWords = async () => {
      const response = await axios.get(
        'https://random-word-api.herokuapp.com/all'
      );
      setWords(response.data);
      setWordToBeGuessed(
        response.data[Math.floor(Math.random() * response.data.length)]
      );
    };
    fetchWords();
  }, []);

  const handleChange = (event) => {
    setGuess(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setAttempts(attempts + 1);
    if (attempts >= 6) {
      setGameOver(true);
      setResult('You have exceeded the maximum number of attempts. Game over!');
    } else if (words.includes(guess)) {
      let resultString = '';
      for (let i = 0; i < guess.length; i++) {
        if (guess[i] === wordToBeGuessed[i]) {
          resultString += `<span style="color: green">${guess[i]}</span>`;
        } else if (wordToBeGuessed.includes(guess[i])) {
          resultString += `<span style="color: yellow">${guess[i]}</span>`;
        } else {
          resultString += `<span style="color: red">${guess[i]}</span>`;
        }
      }
      setResult(resultString);
    } else {
      setResult('Incorrect guess. Please try again.');
    }
  };

  return (
    <div>
      <p>Word to be guessed: {wordToBeGuessed}</p>
      <form onSubmit={handleSubmit}>
        <label>
          Guess:
          <input
            type="text"
            value={guess}
            onChange={handleChange}
            maxLength="5"
            disabled={gameOver}
          />
        </label>
        <button type="submit" disabled={gameOver}>
          Submit
        </button>
      </form>
      <p>Attempts: {attempts}</p>
      {result && <p dangerouslySetInnerHTML={{ __html: result }} />}
    </div>
  );
};

export default WordGame;
