
import React, {useState, useEffect} from 'react';
import Question from './components/Question';
import {nanoid} from 'nanoid';

function App() {

  const [splashScreen, setSplashScreen] = useState(true)
  const [quizOver, setQuizOver] = useState(false)
  const [quizData, setQuizData] = useState([])
  const [score, setScore] = useState(0)
  const [isLoaded, setIsLoaded] = useState(true)

  console.log(quizData)

   useEffect(() => {
    fetchTriviaData()

   }, [])

  function handleSplashClick() {
    setSplashScreen(false)
  }

  const BASE_URL = "https://opentdb.com/api.php?amount=5&type=multiple"

  async function fetchTriviaData() {
    setIsLoaded(false)
    const res = await fetch(BASE_URL)
    let data = await res.json()
    
    const dataArr = data.results.map(( {incorrect_answers, correct_answer, question}) => ({incorrect_answers, correct_answer, question}))

    const questionArr = dataArr.map(question => (
      {
        id: nanoid(),
        ...question,
        selected_answer: ""
      }
    ))

    setQuizData(questionArr)
    setIsLoaded(true)

  }

  function scoreQuiz() {
    setScore(
      quizData.map(question => question.correct_answer === question.selected_answer ? 1 : 0)
          .reduce((scoreSum, score) => scoreSum + score, 0)
    )
    setQuizOver(quizOver => true)
  }

  function resetQuiz() {
    fetchTriviaData()
    setScore(0)
    setQuizOver(quizOver => false)
  }

  function toggleAnswer(id, answer) {
    setQuizData(prevQuizData => prevQuizData.map(
      question => question.id === id ?
      {
        ...question,
        selected_answer: answer
      } :
      question
    ))
  }

  const questionElements = quizData.map(question => {
    return (
      <Question 
        key={question.id}
        id={question.id}
        question={question.question}
        correct_answer={question.correct_answer}
        incorrect_answers={question.incorrect_answers}
        selected_answer={question.selected_answer}
        toggleAnswer={toggleAnswer}
        quizChecked={quizOver}
      />
    )})

  return (
    <div className="App">
      {splashScreen && 
        <div className="splash-screen">
          <h1 className="splash-title">Quizzical</h1>
          <p className="splash-desc">Now with more categories!</p>
          <button className="start-quiz-btn" onClick={handleSplashClick}>Start Quiz</button>
        </div>
      }
 
      {!splashScreen && isLoaded && <div className="quiz-container">
        {questionElements}
        <div className="score-container">
          {quizOver && <h4 className="score-answers">You score {score}/{quizData.length} correct answers</h4> }
          {!quizOver ? <button className="check-answers" onClick={scoreQuiz}>Check Answers</button> :
            <button className="check-answers" onClick={resetQuiz}>Play Again</button> }
        </div>
      </div>
      }
       <div className="circles">
         <span className="bg-circle blue"></span>
         <div className="bg-circle yellow"></div>
       </div>
    </div>
  );
}

export default App;
