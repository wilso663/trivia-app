
import React, {useState, useEffect} from 'react';

function App() {

  const [splashScreen, setSplashScreen] = useState(true)


  function handleSplashClick() {
    setSplashScreen(false)
  }

  const BASE_URL = "https://opentdb.com/api.php?amount=5"

  async function getQuestions() {
    const results = await fetch(BASE_URL)
    console.log(results)
    let data = await results.json()
    console.log(data)
  }

  function decodeHTMLEntities(text) {
    var textArea = document.createElement('textarea');
    textArea.innerHTML = text;
    return textArea.value;
  }

  // getQuestions()
  return (
    <div className="App">
      {splashScreen && 
        <div className="splash-screen">
          <h1 className="splash-title">Quizzical</h1>
          <p className="splash-desc">Now with more categories!</p>
          <button className="start-quiz-btn" onClick={handleSplashClick}>Start Quiz</button>
        </div>
      }
 
      {!splashScreen && <div className="quiz-container">
        <div className="question-container">
          <h4 className="question-text">How would one say goodbye in Spanish?</h4>
          <div className="answers-container">
            <button className="answer selected">Adios</button>
            <button className="answer">Hola</button>
            <button className="answer">Au Revoir</button>
            <button className="answer">Salir</button>
          </div>
        </div>
        <div className="question-container">
          <h4 className="question-text">Which best selling toy of 1983 caused hysteria, resulting in riots breaking in stores?</h4>
          <div className="answers-container">
            <button className="answer selected">Cabbge Patch Kids</button>
            <button className="answer">Transformers</button>
            <button className="answer">Care Bears</button>
            <button className="answer">Rubik's Cube</button>
          </div>
        </div>
        <div className="question-container">
          <h4 className="question-text">How would one say goodbye in Spanish?</h4>
          <div className="answers-container">
            <button className="answer selected">Adios</button>
            <button className="answer">Hola</button>
            <button className="answer">Au Revoir</button>
            <button className="answer">Salir</button>
          </div>
        </div>
        <div className="question-container">
          <h4 className="question-text">How would one say goodbye in Spanish?</h4>
          <div className="answers-container">
            <button className="answer selected">Adios</button>
            <button className="answer">Hola</button>
            <button className="answer">Au Revoir</button>
            <button className="answer">Salir</button>
          </div>
        </div>
        <div className="question-container">
          <h4 className="question-text">How would one say goodbye in Spanish?</h4>
          <div className="answers-container">
            <button className="answer correct">Adios</button>
            <button className="answer incorrect">Hola</button>
            <button className="answer selected incorrect">Au Revoir</button>
            <button className="answer selected">Salir</button>
          </div>
        </div>
        <div className="score">
           <h4 className="correct-answers">You score 3/5 correct answers</h4> 
          <button className="check-answers">Check Answers</button>
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
