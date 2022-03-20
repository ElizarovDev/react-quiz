import { shuffleArray } from "./utils";

export enum Difficulty {
    EASY = 'easy',
    MEDUIM = 'medium',
    HARD = 'hard'
};

export type Question = {
    category: string;
    correct_answer: string;
    difficulty: string;
    question: string;
    incorrect_answers: string[];
    type: string;
}

export type QuestionState = Question & { answers: string[] };

export const fetchQuizQuestions = async (amount: number, difficulty: Difficulty) => {
    const endpoint = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`;
    const data = await (await fetch(endpoint)).json();
    return data.results.map((question:Question):QuestionState=>(
        {
            ...question,
            answers : shuffleArray([
                ...question.incorrect_answers, 
                question.correct_answer])
        }
    ));
};