import React, { useEffect, useState } from "react";
import LogDayQuestions from "./LogDayQuestions";
import { getQuestionAPI, updateQuestionAPI } from "../api/questionAPI";

function LogDay({handleSubmit, questions, setQuestions, user}) {
  // const[responses, setResponse] = useState([]);  

  // //NOTE made for testing purposes
  // useEffect(() => {
  //   console.log("RELOADING QUESTIONS");
  //   console.log("QUESTIONS:", questions);
  // }, [questions]);

  useEffect(() => {
    function fetchData() {
      getQuestionAPI().then((questions) => {
      // console.log("🚀 ~ file: LogDay.js ~ line 16 ~ getQuestionAPI ~ questions", questions[1].responses)
        setQuestions(questions);
      }  ).catch((err) => {
        console.error('Error retrieving question data: ' + err);
      });
    };
    fetchData();
  }, []);


  // const [tempLogs, setTempLogs] = useState({});
  // useEffect(() => {
  //   let currentLogs = {};
  //   questions.forEach(question => currentLogs[question?._id] = { date: formatDate(date), responses: "", parentQuestion: question?._id })
  //   questions.forEach(question => responses.filter(response => response?.date === formatDate(date)).forEach(response => { if (response?.parentQuestion === question?._id) { currentLogs[question?._id] = response } }))
  //   setTempLogs(currentLogs)
  // }, [date, responses, questions]);


  const [date, setDate] = useState(new Date());
  const handleDateForward = () => {
    checkValidDate(date)
      ? setDate(new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1))
      : setDate(new Date(date));
  }

  const handleDateBack = () => {
    setDate(new Date(date.getFullYear(), date.getMonth(), date.getDate() - 1));
  }

  const checkValidDate = (date) => {
    const today = new Date();
    const addDate = new Date(date);
    addDate.setDate(addDate.getDate() + 1);
    return addDate.getTime() <= today.getTime() ? true : false;
  }

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${month}/${day}/${year}`;
  }

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
          <h2> {formatDate(date)}</h2>
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
              answers = {question.responses}
              // setResponse = {setResponse}
              // date = {date}
              date = {formatDate(date)}
            />
          ))}
        <button className="submitBtn" onClick={saveResponseOnServer}>Submit</button>
      </form>
    </div>
  );
}

export default LogDay;
