import React from 'react';
import { AnswerObject } from '../App'
import {Wrapper, ButtonWrapper} from './QuestionCard.styles';


type CardProps = {
    question: string;
    answers: string[];
    callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
    userAnswer: AnswerObject | null;
    questionNumber: number;
    totalQuestions: number;
}

const QuestionCard: React.FC<CardProps> = ({
    question,
    answers,
    callback,
    userAnswer,
    questionNumber,
    totalQuestions }) => (<Wrapper>
        <p className='number'>
            Questions: {questionNumber} / {totalQuestions}
        </p>
        <p dangerouslySetInnerHTML={{ __html: question }} />
        <div>
            {answers.map(answer => (
                <ButtonWrapper 
                correct={userAnswer?.correctAnswer===answer}
                userClicked={userAnswer?.answer===answer}
                key={answer}>
                    <button disabled={userAnswer ? true : false} onClick={callback} value={answer}>
                        <span dangerouslySetInnerHTML={{ __html: answer }} />
                    </button>
                </ButtonWrapper>
            ))}
        </div>
    </Wrapper>);

export default QuestionCard;