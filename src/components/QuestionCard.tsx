/* eslint-disable array-callback-return */
import React from 'react';
import { AnswerObject } from '../App';

type Props = {
  question: string;
  answers: string[];
  userAnswer: AnswerObject | undefined;
  questionNum: number;
  totalQuestions: number;
  callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

const QuestionCard: React.FC<Props> = ({
  question,
  answers,
  userAnswer,
  questionNum,
  totalQuestions,
  callback,
}) => {
  return (
    <div className="card-question">
      <h1>
        Question {questionNum} / {totalQuestions}
      </h1>
      <p>{question}</p>
      {answers.map((answer) => (
        <button
          disabled={userAnswer ? true : false}
          key={answer}
          value={answer}
          onClick={callback}
          className={
            userAnswer?.answer === answer
              ? 'user-clicked'
              : userAnswer?.correctAnswer === answer
              ? 'correct-answer'
              : ''
          }
        >
          {answer}
        </button>
      ))}
    </div>
  );
};

export default QuestionCard;
