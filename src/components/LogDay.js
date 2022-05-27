import React, { useEffect, useState } from "react";
import LogDayQuestions from "./LogDayQuestions";
import { getQuestionAPI } from "../api/questionAPI";

function LogDay({handleSubmit, questions, setQuestions, user }) {

  const[response, setResponse] = useState([]);  

  useEffect(()=>{
    console.log("updating response");
  },[response]);
  
  useEffect(() => {
    function fetchData() {
      getQuestionAPI().then((questions) => { 
      }  ).catch((err) => {
        console.error('Error retrieving note data: ' + err);
      });
    };
    fetchData();
  }, []);

  const handleDateBack = () =>{
    console.log("Date Back");
  }
  const handleDateForward = () =>{
    console.log("Date Forward");
  }

  const handleResponseChange = (e) =>{
    setResponse((prevValues)=>({
      ...prevValues,[e.target.name]:e.target.value
    }))
  }

  const saveResponseOnServer = () =>{
    console.log("Clicked");
  }
  
  return (
    <div className="logDayContainer">
      <form onSubmit={handleSubmit} className="logDayContent">
        <div className="logDayDate">
          <button
            className="material-symbols-outlined dateBtn"
            onClick={handleDateBack}
          >
            arrow_back_ios
          </button>
          <h2> 2/21/2021 </h2>
          <button
            className="material-symbols-outlined dateBtn"
            onClick={handleDateForward}
          >
            arrow_forward_ios
          </button>
        </div>
        {questions.map((question) => (
            <LogDayQuestions
              user={user}
              key={question._id}
              id={question._id}
              text={question.questionText}
              type={question.questionType}
              choice={question.multipleChoice}
              questions={questions}
              setQuestions={setQuestions}
              handleResponseChange={handleResponseChange}
              response = {response}
              setResponse ={setResponse}
            />
          ))}
        <button className="submitBtn" onClick={saveResponseOnServer}>Submit</button>
      </form>
    </div>
  );
}

export default LogDay;
