import React, { useEffect, useCallback, useState } from "react";
import LogDayQuestions from "./LogDayQuestions";
import { getQuestionAPI, updateQuestionAPI } from "../api/questionAPI";

function LogDay({handleSubmit, questions, setQuestions, user }) {

  // //NOTE made for testing purposes
  // useEffect(() => {
  //   console.log("RELOADING QUESTIONS");
  //   console.log("QUESTIONS:", questions);
  // }, [questions]);

  useEffect(() => {
    function fetchData() {
      getQuestionAPI().then((questions) => { 
        setQuestions(questions);
      }  ).catch((err) => {
        console.error('Error retrieving note data: ' + err);
      });
    };
    fetchData();
  }, []);

  let mainDate = new Date();
  const[date, setNextDate] = useState(mainDate);

  useEffect(()=>{
    // console.log("console logging",date);
    // console.log("console logging",mainDate);
    mainDate = date;
    setNextDate(mainDate);
  }, [date])

  const handleDateBack = () =>{
    console.log("Date Back");
    mainDate.setDate(mainDate.getDate() - 1);
    setNextDate(mainDate);
  }

  const handleDateForward = () =>{
    console.log("Date Forward");
    mainDate.setDate(mainDate.getDate() + 1);
    if(mainDate <= new Date()){
      console.log("true");
      setNextDate(mainDate);
    }
    else{
      console.log("false");
      setNextDate(new Date());
      console.log("Cannot get next date");
    }

  }

// const date = new Date();
// const year = date.getFullYear();
// const month = date.getMonth() + 1;
// const day = date.getDate();

// const withSlashes = [year, month, day].join('/');
// console.log(withSlashes); // 👉️ 2022/10/25

  const saveResponseOnServer = () =>{
    questions.map(question =>
      updateQuestionAPI(question)
        .then((res) => {
          const updatedQuestions = [...questions];
          setQuestions(updatedQuestions);
        })
        .catch((err) => {
          console.error("Error retrieving question data: ", err);
        })
      )
    alert("Response successfully saved!");
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
          <h2> {date.toISOString().replace('-', '/').split('T')[0].replace('-', '/')}</h2>
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
            />
          ))}
        <button className="submitBtn" onClick={saveResponseOnServer}>Submit</button>
      </form>
    </div>
  );
}

export default LogDay;
