import React, { useState } from 'react';
import QuestionCard from './components/QuestionCard';
import { Difficulty, fetchQuizQuestions, QuestionState } from './API';
import { GlobalStyle, Wrapper } from './App.styles';

const TOTAL_QUESTIONS = 10;

export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
};

const App = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState<number>(0);
  const [isGameOver, setIsGameOver] = useState<boolean>(true);

  const startTrivia = async () => {
    setIsLoading(true);
    setIsGameOver(false);

    const newQuestions = await fetchQuizQuestions(TOTAL_QUESTIONS, Difficulty.EASY);
    setQuestions(newQuestions);

    setScore(0);
    setUserAnswers([]); //?
    setNumber(0); //?
    setIsLoading(false);
  };

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>): void => {
    if (!isGameOver) {
      const answer = e.currentTarget.value;
      const isCorrect = questions[number].correct_answer === answer;
      if (isCorrect) setScore(state => state + 1);
      const userAnswer = {
        question: questions[number].question,
        correct: isCorrect,
        answer,
        correctAnswer: questions[number].correct_answer
      };
      setUserAnswers(state => [...state, userAnswer]);
    }
  };

  const nextQuestion = () => {
    const nextQuestionNumber = number + 1;
    if (nextQuestionNumber === TOTAL_QUESTIONS) {
      setIsGameOver(true);
    } else {
      setNumber(nextQuestionNumber);
    }
  };

  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <h1>REACT QUIZ</h1>
        {isGameOver || userAnswers.length === TOTAL_QUESTIONS
          ? <button className='start' onClick={startTrivia}>Start</button>
          : null
        }
        {!isGameOver ? <p className='score'>Score: {score}</p> : null}
        {isLoading && <p>Loading questions...</p>}
        {!isLoading && !isGameOver
          ? <QuestionCard
            questionNumber={number + 1}
            totalQuestions={TOTAL_QUESTIONS}
            question={questions[number].question}
            answers={questions[number].answers}
            userAnswer={userAnswers ? userAnswers[number] : null}
            callback={checkAnswer}
          />
          : null
        }
        {!isLoading && !isGameOver && userAnswers.length === number + 1 && number !== TOTAL_QUESTIONS - 1
          ? <button className='next' onClick={nextQuestion}>Next</button>
          : null
        }
      </Wrapper>
    </>

  );
}

export default App;
