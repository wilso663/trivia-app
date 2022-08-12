import React from 'react';
import Question from "./Question";
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';


describe('Question Component', () => {


  const toggleAnswer = jest.fn();
  const question = "Which answer spells out correct answer"
  const correct_answer = "correct answer"
  const incorrect_answers = ['incorrect answer','is wrong','very wrong']
  let quizChecked = false


  it('Question renders', () => {
    render(<Question id={'u1'} question={question} correct_answer={correct_answer} incorrect_answers={incorrect_answers} selected_answer={correct_answer} toggleAnswer={toggleAnswer} quizChecked={quizChecked}/>)
    const questionElement = screen.getByText('Which answer spells out correct answer')
    expect(questionElement).toBeInTheDocument();
  });
  //Test that pressing an answer adds the selected class
  it('Pressing an answer adds the selected className to the className List', () => {
    render(<Question id={'u1'} question={question} correct_answer={correct_answer} incorrect_answers={incorrect_answers} selected_answer={correct_answer} toggleAnswer={toggleAnswer} quizChecked={quizChecked}/>)
    const buttonElement = screen.getByRole("button", {name: 'correct answer'})
    userEvent.click(buttonElement)
    expect(buttonElement).toHaveClass('selected');
  })
  //Test that having the correct answer and incorrect answers adds the button className styles
  //Note: To do this, we'll artifically enable the button, as this style only applies once the quiz is over and the button is disabled
  it('Pressing a correct answer adds the correct answer className to the className List', () => {
    render(<Question id={'u1'} question={question} correct_answer={correct_answer} incorrect_answers={incorrect_answers} selected_answer={correct_answer} toggleAnswer={toggleAnswer} quizChecked={true}/>)
    const buttonElement = screen.getByRole("button", {name: 'correct answer'})
    buttonElement.removeAttribute('disabled');
    userEvent.click(buttonElement)
    expect(buttonElement).toHaveClass('correct')
  })

  it('Pressing an incorrect answer adds the incorrect answer className to the className List', () => {
    render(<Question id={'u1'} question={question} correct_answer={correct_answer} incorrect_answers={incorrect_answers} selected_answer={incorrect_answers[0]} toggleAnswer={toggleAnswer} quizChecked={true}/>)
    const buttonElement = screen.getByRole("button", {name: 'incorrect answer'})
    buttonElement.removeAttribute('disabled');
    userEvent.click(buttonElement)
    expect(buttonElement).toHaveClass('incorrect')
  })

  //Test that updating quizChecked disables the buttons
  it('The quizChecked property being true disables the answer buttons', () => {
    render(<Question id={'u1'} question={question} correct_answer={correct_answer} incorrect_answers={incorrect_answers} selected_answer={correct_answer} toggleAnswer={toggleAnswer} quizChecked={true}/>)
    const buttonElement = screen.getByRole("button", { name: 'correct answer'})
    expect(buttonElement).toBeDisabled()
  })

})