
import React, {useState, useEffect} from 'react';
import Question from './components/Question';
import {nanoid} from 'nanoid';
import {questions} from './data';
import {answers} from './data';

function App() {

  const [splashScreen, setSplashScreen] = useState(false)
  const [quizOver, setQuizOver] = useState(false)
  const [quizQuestions, setQuizQuestions] = useState([])
  const [quizAnswers, setAnswers] = useState([])
  const [isLoaded, setIsLoaded] = useState(true)

  console.log(quizQuestions)
  console.log(quizAnswers)
   useEffect(() => {
     setQuizQuestions(questions)
     setAnswers(answers)
    //fetchTriviaData()

   }, [])

  function handleSplashClick() {

    setSplashScreen(false)
  }

  const BASE_URL = "https://opentdb.com/api.php?amount=5&type=multiple"

  async function fetchTriviaData() {
    const results = await fetch(BASE_URL)
    let data = await results.json()
    
    const questionsArr = data.results.map(( {incorrect_answers, correct_answer, question}) => ({incorrect_answers, correct_answer, question}))
    let formattedAnswers = []
    let formattedQuestions = []
    for( let i = 0; i < questionsArr.length; i++){
      const answers = questionsArr[i].incorrect_answers.map(((item, index) => ({answer: decodeHTMLEntities(item), isCorrect: false, isSelected: false, id: nanoid() })))

      answers.push({
      answer: decodeHTMLEntities(questionsArr[i].correct_answer),
      isCorrect: true,
      isSelected: false,
      id: nanoid()
      })
      answers.sort(() => Math.random() - 0.5)
      formattedAnswers.push({answers: answers})
      formattedQuestions.push({question: decodeHTMLEntities(questionsArr[i].question)})
    }
    setQuizQuestions(formattedQuestions)
    setAnswers(formattedAnswers)
    console.log(formattedQuestions)
    console.log(formattedAnswers)
    setIsLoaded(true)
  }

  function decodeHTMLEntities(text) {
    var textArea = document.createElement('textarea');
    textArea.innerHTML = text;
    return textArea.value;
  }

  //i am so confused. redoing this, but not now
  function selectAnswer(id) {
    const newQuestions = [...quizQuestions]
    for(let i = 0; i < newQuestions.length; i++){
      for(let j = 0; j < newQuestions[i].answers.length; j++){
        console.log(id)
        console.log(newQuestions[i].answers[j].id)
        if(newQuestions[i].answers[j].id === id){
          newQuestions[i].answers[j].isSelected = true
        } else {
          newQuestions[i].answers[j].isSelected = false
        }
      }
    }
    console.log(newQuestions)
    setQuizQuestions(newQuestions)
  }
    // setQuizQuestions((prevQuestions) => {
    //   return { ...prevQuestions,
    //   answers: prevQuestions.answers.map((item) => {
    //     return item.id === id ? {...item, isSelected: true} : item
    //   }),
    //   }
    //})

  

  function scoreQuiz() {
    setQuizOver(quizOver => true)
  }

  function resetQuiz() {
    setQuizOver(quizOver => false)
  }



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
        {quizQuestions.map((item, index) => 
          (<Question question={item.question} key={index}  />)
        )}
      
        <div className="score-container">
          {quizOver && <h4 className="score-answers">You score 3/5 correct answers</h4> }
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
