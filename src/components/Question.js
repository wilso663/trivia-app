import React, {useState, useEffect} from 'react'
import {nanoid} from 'nanoid'

function Question({id, question, correct_answer, incorrect_answers, selected_answer, toggleAnswer, quizChecked}) {

  const [answers, setAnswers] = useState([])

  useEffect(() => {
    let answersCopy = [...incorrect_answers]
    answersCopy.splice(Math.random() * incorrect_answers.length, 0, correct_answer)
    setAnswers(answersCopy.map(answer => decodeHTMLEntities(answer)))
  }, [])

  function decodeHTMLEntities(text) {
    var textArea = document.createElement('textarea');
    textArea.innerHTML = text;
    return textArea.value;
  }

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