import React, {useState, useEffect} from 'react'
import {nanoid} from 'nanoid'

interface QuestionProps {
  id: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
  selected_answer: string;
  toggleAnswer: Function;
  quizChecked: boolean;
}

const Question: React.FC<QuestionProps> = ({id, question, correct_answer, incorrect_answers, selected_answer, toggleAnswer, quizChecked}) => {

  const [answers, setAnswers] = useState<Array<string>>([])

  /* When getting data from this API, the answers array would be returned as a string, but it still had HTML encoding
   * as if it were part of a URL, like 'The%20Answer' instead of 'The Answer'
   * So, I created this useEffect to convert it to plain text when the Question Component is first mounted
   */
  useEffect(() => {
    let answersCopy = [...incorrect_answers]
    answersCopy.splice(Math.random() * incorrect_answers.length, 0, correct_answer)
    setAnswers(answersCopy.map(answer => decodeHTMLEntities(answer)))
  }, [])

  function decodeHTMLEntities(text: string): string {
    var textArea = document.createElement('textarea');
    textArea.innerHTML = text;
    return textArea.value;
  }

  /* I chose to add css styling to the buttons this simple way
   * because there are only ever selected, right, and wrong answers
   */
  const answersElements = answers.map(answer => {
    let btnClassName = "answer "
    if(answer === selected_answer)
      btnClassName += "selected "
    if(quizChecked) {
      if(answer === correct_answer)
        btnClassName += "correct "
      else if(answer !== correct_answer)
        btnClassName += "incorrect "
    } 

    return (
      <button
      key={nanoid()}
      className={btnClassName}
      onClick={() => toggleAnswer(id, answer)}
      disabled={quizChecked}
      >
        {answer}
      </button>
    )
  })


  return (
    <div className="question-container">
      <h4 className="question-text">{decodeHTMLEntities(question)}</h4>
      <div className="answers-container">
        {answersElements}
      </div>
    </div>
  )
}

export default Question