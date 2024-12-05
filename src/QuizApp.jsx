import React, { useState, useEffect } from 'react';
import './App.css';

function QuizApp() {
  const questions = [
    {
        question: 'What does "var" do in JavaScript?',
        options: ['Defines a constant', 'Declares a variable', 'Declares a function', 'None of the above'],
        correct: 'Declares a variable',
      },
      {
        question: 'Which method is used to convert a string into a number in JavaScript?',
        options: ['parseInt()', 'parseFloat()', 'toNumber()', 'Number()'],
        correct: 'Number()',
      },
      {
        question: 'What is the output of "console.log(2 + "2")" in JavaScript?',
        options: ['4', '22', 'Error', 'undefined'],
        correct: '22',
      },
      {
        question: 'Which of the following is a JavaScript framework?',
        options: ['React', 'Angular', 'Vue', 'All of the above'],
        correct: 'All of the above',
      },
      {
        question: 'What is a closure in JavaScript?',
        options: ['A block of code that can be executed multiple times', 'A function inside another function that has access to the outer function\'s variables', 'A callback function', 'None of the above'],
        correct: 'A function inside another function that has access to the outer function\'s variables',
      },
      {
        question: 'Which symbol is used for single-line comments in JavaScript?',
        options: ['#', '//', '/* */', '<!-- -->'],
        correct: '//',
      },
      {
        question: 'Which of the following are primitive data types in JavaScript?',
        options: ['String', 'Number', 'Boolean', 'All of the above'],
        correct: 'All of the above',
      },
      {
        question: 'How can you stop a loop in JavaScript?',
        options: ['break', 'continue', 'exit', 'stop'],
        correct: 'break',
      },
      {
        question: 'Which operator is used for strict equality comparison in JavaScript?',
        options: ['==', '===', '!=', '!=='],
        correct: '===',
      },
      {
        question: 'What does JSON stand for?',
        options: ['JavaScript Object Notation', 'JavaScript Online Notation', 'JavaScripting Object Notation', 'None of the above'],
        correct: 'JavaScript Object Notation',
      },
      // React.js Questions
      {
        question: 'What is React?',
        options: ['A library for building user interfaces', 'A programming language', 'A database', 'A tool for testing'],
        correct: 'A library for building user interfaces',
      },
      {
        question: 'What is JSX in React?',
        options: ['A JavaScript syntax extension that looks like HTML', 'A template engine', 'A new version of JavaScript', 'A CSS preprocessor'],
        correct: 'A JavaScript syntax extension that looks like HTML',
      },
      {
        question: 'What is a component in React?',
        options: ['A function or class that optionally accepts inputs and returns a React element', 'A part of the UI', 'A DOM element', 'None of the above'],
        correct: 'A function or class that optionally accepts inputs and returns a React element',
      },
      {
        question: 'How do you create a functional component in React?',
        options: ['By using the function keyword', 'By using the class keyword', 'By using the component keyword', 'By using a constructor'],
        correct: 'By using the function keyword',
      },
      {
        question: 'What is the purpose of the useState hook in React?',
        options: ['To handle state in functional components', 'To handle events', 'To interact with the DOM', 'To define CSS styles'],
        correct: 'To handle state in functional components',
      },
      {
        question: 'What does ReactDOM.render() do?',
        options: ['It renders a React element into the DOM', 'It renders a component to the server', 'It renders the CSS styles', 'It manages React components'],
        correct: 'It renders a React element into the DOM',
      },
      {
        question: 'What is a React state?',
        options: ['An object that stores data that affects rendering', 'A CSS property', 'A lifecycle method', 'A DOM element'],
        correct: 'An object that stores data that affects rendering',
      },
      {
        question: 'What is the purpose of React Router?',
        options: ['To navigate between different views or pages in a React app', 'To handle state management', 'To manage props', 'To fetch data from APIs'],
        correct: 'To navigate between different views or pages in a React app',
      },
      {
        question: 'What are props in React?',
        options: ['Props are used to pass data to components', 'Props are used to manage state', 'Props are used to manage events', 'None of the above'],
        correct: 'Props are used to pass data to components',
      },
      {
        question: 'What is the React lifecycle method that is called after the component has been rendered?',
        options: ['componentDidMount()', 'render()', 'componentWillMount()', 'componentDidUpdate()'],
        correct: 'componentDidMount()',
      },
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(20 * 60); 

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer); 
          setQuizComplete(true); 
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000); 
    return () => clearInterval(timer); 
  }, []);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleNext = () => {
    if (selectedOption === '') {
      return;
    }

    const isCorrect = selectedOption === questions[currentQuestion].correct;
    setAnswers((prevAnswers) => [
      ...prevAnswers,
      isCorrect ? 1 : 0,
    ]);

    if (currentQuestion + 1 < questions.length) {
      setTimeout(() => {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedOption('');
      }, 1000);
    } else {
      setTimeout(() => setQuizComplete(true), 1000);
    }
  };

  const handleSubmit = () => {
    const totalScore = answers.reduce((acc, val) => acc + val, 0);
    alert(`Quiz Complete! You scored ${totalScore} out of 20.`);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  if (quizComplete) {
    return (
      <div className="container">
        <div className="feedback">
          Quiz Complete! You scored {answers.reduce((acc, val) => acc + val, 0)} out of 20!
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div id="timer" className="timer">
        Time Left: {formatTime(timeLeft)}
      </div>
      <div id="question" className="question">
         {currentQuestion + 1}. {questions[currentQuestion].question}
      </div>
      <div>
        {questions[currentQuestion].options.map((option, index) => (
          <div key={index} className="options">
            <input
              type="radio"
              id={`option${index + 1}`}
              name="option"
              value={option}
              checked={selectedOption === option}
              onChange={handleOptionChange}
            />
            <label htmlFor={`option${index + 1}`}>{option}</label>
          </div>
        ))}
      </div>
      <button className="button" onClick={handleNext}>
        {currentQuestion + 1 === 20 ? 'Submit' : 'Next'}
      </button>
    </div>
  );
}

export default QuizApp;
