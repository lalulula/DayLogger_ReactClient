import React, { useEffect } from "react";
import LogDayQuestions from "./LogDayQuestions";
import { getQuestionAPI } from "../api/questionAPI";

function LogDay({handleSubmit,questions, setQuestions, user }) {
  console.log("LogDay", questions);

  const handleDateBack = () =>{
    console.log("Date Back");
  }
  const handleDateForward = () =>{
    console.log("Date Forward");
  }

  useEffect(() => {
    function fetchData() {
      getQuestionAPI().then((questions) => { 
        console.dir(questions);
        setQuestions(questions);
      }  ).catch((err) => {
        console.error('Error retrieving note data: ' + err);
      });
    };
    fetchData();
  }, []);
  
  return (
    <div className="logDayContainer">
      <form onSubmit={handleSubmit} className="logDayContent">
        <div className="logDayDate">
          <button className="material-symbols-outlined dateBtn" onClick={handleDateBack}>arrow_back_ios</button>
          <h2> 2/21/2021 </h2>
          <button className="material-symbols-outlined dateBtn" onClick={handleDateForward}>arrow_forward_ios</button>
        </div>

        {questions.map((q)=>{
          <LogDayQuestions  user={user}
                            key={q._id}
                            id={q._id}
                            text={q.questionText}
                            type={q.questionType}
                            choice={q.multipleChoice}
                            />
        })}
        <button className="submitBtn">Submit</button>
      </form>
    </div>
  );
}

export default LogDay;
