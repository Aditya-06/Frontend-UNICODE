import React, { useState, Fragment } from 'react';
import Qnumber from './qnumber';
import Question from './question';
import Answers from './answers';
import question_bank from './questions.json';
import './App.css';


function App() {

  // setting hooks-- using state properties
  const [currentQ, setCurrentQ] = useState(0);
  const [currentA, setCurrentA] = useState("");
  const [noOption, handleNoOption] = useState('');
  const [results, showResults] = useState(false);
  const [answers, setAnswer] = useState([]);

  // using the current question from the JSON file containing the question-info
  const question = question_bank[currentQ];
  
  
  // when a option a selected, we do not want an error to be shown--- changing noOption state to blank
  const buttonClick = e => {

    // we want to store the option selected so we can compare that with the answer
    setCurrentA(e.target.value);
    handleNoOption('');
  }

  const next = () => {
    // if no option is selected and the user clicks on "submit and save", an error message must be dislpayed
    if (!currentA) {
      handleNoOption("Please select an option...there is no negative marking ");
      return;
    }

    // we want to store information about the selected option and store it in an array
    const answer = {questionId: question.id, answer: currentA};
    answers.push(answer);
    setAnswer(answers);
    setCurrentA('');

    // show next question
    if (currentQ + 1 < 5) {
      setCurrentQ(currentQ + 1);
      return;
    }

    // show result if all questions have been attempted
    showResults(true);
  }

  // prints error message if an option is not selected and user attemptes to move on to the next question
  const checkForNoOption = () => {
    if (!noOption) {
      return;
    } else {
      return <>
      <div>{noOption}</div>
      </>
    }
  }

  // prints appropriate message if selected option matches the correct option
  const isCorrect = (question, answer) => {
    if (answer.answer === question.answer) {
      return (
        <div className="result-correct">
          <p>Yay your answer is correct!</p>
        </div>
        
      )
    } else {
      return (
        <div className="result-wrong">
          <p>The correct answer is {question.answer}</p>
          <p>Reason: {question.description}</p>
        </div>
      )
    }
  }

  
  // Results page-- finds question from question bank with matching id  and returns the results of each question to be rendered
  const showResultAnalysis = () => {
    return answers.map(answer => {
      const question = question_bank.find( question =>
        question.id === answer.questionId
      );

      //  renders the result of each question
      return (
        <div className="results" key={question.id}> 
          {question.question}
          {isCorrect(question, answer)}
      
          
        </div>
      )
    })
  }


  // after all questions are attempted, returns the results page
  if (results) {
    return (
      <div className="container">
        <h2>The Results are out !</h2>
        <div>
          <ul>
            {showResultAnalysis()}
          </ul>
        </div>  
      </div>
    )

    // if all the questions are not attempted, render the next question
  } else {
    return (
      <div className="container">
        <Qnumber total="5" currentQ={question.id} /> 
        <Question question={question.question} />
        <span id="error">{checkForNoOption()}</span>
        <Answers options={question.option} currentA={currentA} buttonClick={buttonClick}/>    
        <button className="btn btn-next" onClick={next}>Save and next</button>
      </div>
    )
  }

 

}

export default App;
