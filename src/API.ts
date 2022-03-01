import { shuffleArray } from './utils';

export type Question = {
  category: string;
  correct_answer: string;
  difficulty: string;
  incorrect_answers: string[];
  question: string;
  type: string;
};

export type QuestionsState = Question & { answers: string[] };

export const fetchQuestions = async (amount: number): Promise<QuestionsState[]> => {
  const questions = await (await fetch(`https://opentdb.com/api.php?amount=${amount}`)).json();
  return questions.results.map((question: Question) => {
    return {
      ...question,
      answers: shuffleArray([...question.incorrect_answers, question.correct_answer]),
    };
  });
};
