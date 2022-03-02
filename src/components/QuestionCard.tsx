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
      <h2>
        Question {questionNum} / {totalQuestions}
      </h2>
      <p>{question}</p>
      {answers.map((answer) => (
        <button
          key={answer}
          value={answer}
          disabled={userAnswer ? true : false}
          onClick={callback}
          className={
            userAnswer?.correctAnswer === answer
              ? 'correct-answer'
              : userAnswer?.answer === answer && userAnswer?.correctAnswer === answer
              ? 'correct-answer'
              : userAnswer?.answer !== userAnswer?.correctAnswer && userAnswer?.answer === answer
              ? 'incorrect-answer'
              : undefined
          }
        >
          {answer}
        </button>
      ))}
    </div>
  );
};

export default QuestionCard;
