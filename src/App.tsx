import React, { useState } from 'react';
import { fetchQuestions } from './API';
import './App.css';
import QuestionCard from './components/QuestionCard';
import { QuestionsState } from './API';

const TOTAL_QUESTIONS = 10;

export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
};

const App = () => {
  const [questions, setQuestions] = useState<QuestionsState[]>([]);
  const [number, setNumber] = useState(0);
  const [gameOver, setGameOver] = useState(true);
  const [score, setScore] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [loading, setLoading] = useState(false);

  const startGame = async () => {
    setLoading(true);
    setGameOver(false);
    const questions = await fetchQuestions(TOTAL_QUESTIONS);
    console.log(questions);
    setQuestions(questions);
    setLoading(false);
  };

  const checkAnswer = (e: any) => {
    const answer = e.target.value;
    const correct = questions[number].correct_answer === answer;
    if (correct) {
      setScore((prev) => prev + 1);
    }
    const answerObj = {
      question: questions[number].question,
      answer,
      correct,
      correctAnswer: questions[number].correct_answer,
    };
    setUserAnswers((prev) => [...prev, answerObj]);
  };

  const nextQuestion = () => {};

  return (
    <div className="App">
      {(!loading && gameOver && (
        <div className="btn-start">
          <button onClick={startGame}>Start Game</button>
        </div>
      )) ||
        null}

      {loading ? (
        <div className="loading">
          <p>Loading Questions...</p>
        </div>
      ) : null}
      {!loading && questions.length ? (
        <div className="question-component">
          <h2>React Quiz</h2>
          <p className="score">Score: {score}</p>
          <QuestionCard
            question={questions[number].question}
            answers={questions[number].answers}
            userAnswer={userAnswers ? userAnswers[number] : undefined}
            questionNum={number + 1}
            totalQuestions={TOTAL_QUESTIONS}
            callback={checkAnswer}
          />
        </div>
      ) : null}
      {!loading && questions.length ? (
        <div className="btn-next">
          <button>Next question</button>
        </div>
      ) : null}
    </div>
  );
};

export default App;
