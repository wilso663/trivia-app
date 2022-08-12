/* eslint-disable testing-library/no-unnecessary-act */
import App from './App';
import React from 'react';
import { render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event';

describe('App Initial State', () => {

  //test that pressing the start quiz button disables the splash screen and enables the quiz
  it('Pressing the start quiz button renders the quiz and disables the splash screen', async () => {
    render(<App/>)
    const buttonElement = screen.getByRole('button', {name: /Start Quiz/i})
    expect(buttonElement).toBeInTheDocument()
    userEvent.click(buttonElement) 
    expect(buttonElement).not.toBeInTheDocument()
  });

});

describe('App Quiz functionality', () => {

  //The mock quiz data is in the './src/mocks/handlers.js' file
  it('The question elements render properly when the start quiz button is pressed', async () => {
    render(<App/>)
    const startButton = screen.getByRole('button', {name: /Start Quiz/i});
    userEvent.click(startButton);
    const questionOne = await screen.findByText(/when was the movie/i);
    const questionFive = await screen.findByText(/Secret Power/i);
    expect(questionOne).toBeInTheDocument();
    expect(questionFive).toBeInTheDocument();
    
  });
  it('The quiz score correctly adds up to 4 when all questions are correct except 1 and disables the quiz questions', async () => {
    render(<App/>);
    const startButton = screen.getByRole('button', {name: /Start Quiz/i});
    userEvent.click(startButton);

    //Answer one should be incorrect, answers two through five should be correct
    const answerOne = await screen.findByText('1985');
    userEvent.click(answerOne);
    const answerTwo = await screen.findByText('The I.D.P.D');
    userEvent.click(answerTwo);
    const answerThree = await screen.findByText('4');
    userEvent.click(answerThree);
    const answerFour = await screen.findByText('Spark');
    userEvent.click(answerFour);
    const answerFive = await screen.findByText('Audino');
    userEvent.click(answerFive);

    const checkAnswersButton = screen.getByRole('button', {name: 'Check Answers'});
    userEvent.click(checkAnswersButton);
    const quizScore = screen.getByText(/You score 4\/5 correct answers/i)
    expect(quizScore).toBeInTheDocument();
    //update the reference to the answer buttons
    const answerOneAgain = await screen.findByText('1985');
    const answerTwoAgain = await screen.findByText('The I.D.P.D');
    expect(answerOneAgain).toBeDisabled();
    expect(answerTwoAgain).toBeDisabled();
  });
  it('Pressing the restart quiz button after the quiz is scored rerenders the next 5 quiz questions', async () => {
    render(<App/>);
    const startButton = screen.getByRole('button', {name: /Start Quiz/i});
    userEvent.click(startButton);

    //Answer one should be incorrect, answers two through five should be correct
    const answerOne = await screen.findByText('1985');
    userEvent.click(answerOne);
    const answerTwo = await screen.findByText('The I.D.P.D');
    userEvent.click(answerTwo);
    const answerThree = await screen.findByText('4');
    userEvent.click(answerThree);
    const answerFour = await screen.findByText('Spark');
    userEvent.click(answerFour);
    const answerFive = await screen.findByText('Audino');
    userEvent.click(answerFive);

    const checkAnswersButton = screen.getByRole('button', {name: 'Check Answers'});
    userEvent.click(checkAnswersButton);
    const resetQuizButton = screen.getByRole('button', {name: 'Play Again'});
    userEvent.click(resetQuizButton);

    //quiz is reset and repopulates
    const answerOneAgain = await screen.findByText('1985');
    const answerTwoAgain = await screen.findByText('The I.D.P.D');
    expect(answerOneAgain).toBeInTheDocument();
    expect(answerTwoAgain).toBeInTheDocument();
  });
});