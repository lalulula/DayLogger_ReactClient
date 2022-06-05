import React, { useEffect, useState } from "react";
import LogDayQuestions from "./LogDayQuestions";
import { getQuestionAPI, updateQuestionAPI } from "../api/questionAPI";

function LogDay({ handleSubmit, questions, setQuestions, user, disabled }) {
  // //NOTE made for testing purposes
  // useEffect(() => {
  //   console.log("RELOADING QUESTIONS");
  //   console.log("QUESTIONS:", questions);
  // }, [questions]);

  useEffect(() => {
    // console.log(formatDate(date))
    // console.log(formatDate(new Date()))
    function fetchData() {
      getQuestionAPI()
        .then((questions) => {
          // console.log("🚀 ~ file: LogDay.js ~ line 16 ~ getQuestionAPI ~ questions", questions[1].responses)
          setQuestions(questions);
        })
        .catch((err) => {
          console.error("Error retrieving question data: " + err);
        });
    }
    fetchData();
  }, []);

  const [date, setDate] = useState(new Date());

  const handleDateForward = () => {
    checkValidDate(date)
      ? setDate(
          new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1)
        )
      : setDate(new Date(date));
  };

  const handleDateBack = () => {
    setDate(new Date(date.getFullYear(), date.getMonth(), date.getDate() - 1));
  };

  const checkValidDate = (date) => {
    const today = new Date();
    const addDate = new Date(date);
    addDate.setDate(addDate.getDate() + 1);
    return addDate.getTime() <= today.getTime() ? true : false;
  };

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${month}/${day}/${year}`;
  };

  const saveResponseOnServer = () => {
    console.log(questions);
    questions.map((question) =>
      updateQuestionAPI(question)
        .then((res) => {
          const updatedQuestions = [...questions];
          setQuestions(updatedQuestions);
        })
        .catch((err) => {
          console.error("Error retrieving question data: ", err);
        })
    );
    alert("Response successfully saved!");
  };

  return (
    <div className="logDayContainer">
      <form onSubmit={handleSubmit} className="logDayContent" id="lDContent">
        <div
          className="logDayDate"
          style={{
            maxWidth: "600px",
            width: "100%",
            justifyContent: "space-between",
            display: "flex",
          }}
        >
          <button
            className="dateBtn "
            id="dateBack"
            onClick={handleDateBack}
            style ={{ fontSize: "30px", fontWeight: "bold"}}
          >
            &lt;
          </button>
          <h2> {formatDate(date)}</h2>
          <button
            className="dateBtn"
            id="dateFor"
            onClick={handleDateForward}
            style ={{ fontSize: "30px", fontWeight: "bold", display: formatDate(date) === formatDate(new Date())? "none" : "block"}}
          >
            &gt;
          </button>
          <div style ={{ fontSize: "30px", fontWeight: "bold", display: formatDate(date) === formatDate(new Date())? "block" : "none"}}>&nbsp;</div>
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
            answers={question.responses}
            // setResponse = {setResponse}
            // date = {date}
            date={formatDate(date)}
            disabled={disabled}
          />
        ))}
        {!disabled && (
          <div style={{ maxWidth: "600px", textAlign: "-webkit-left" }}>
            <button className="submitBtn" onClick={saveResponseOnServer}>
              Submit
            </button>
          </div>
        )}
      </form>
    </div>
  );
}

export default LogDay;
