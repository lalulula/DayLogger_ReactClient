import React, { useCallback, useEffect, useState } from "react";
import { getQuestionAPI } from "../api/questionAPI";

function LogDayQuestions({
  user,
  id,
  text,
  type,
  choice,
  date,
  questions,
  setQuestions,
  answers,
  disabled,
}) {
  // console.log(Object.keys(responses));

  // console.log(answers);
  const [responses, setResponse] = useState([]);
  useEffect(() => {
    const newQuestion = {
      _id: id,
      questionText: text,
      questionType: type,
      multipleChoice: choice,
      user: user,
      responses: responses,
      date: date,
    };
    const updatedQuestions = [
      ...questions.map((q) => (q._id === id ? newQuestion : q)),
    ];
    setQuestions(updatedQuestions);
  }, [responses]);

  const handleResponseChange = (e) => {
    setResponse({ ...responses, [date]: e.target.value });
  };
  if (type === "number") {
    return (
      <div className="logDayDiv">
        {text}
        <br />
        <input
          value={answers[date] ? answers[date] : ""}
          onChange={handleResponseChange}
          type="numeric"
          name="numResponse"
          id="numResponse"
          placeholder="Enter..."
          style={{ marginTop: "5px", padding: "5px", borderRadius: "5px" }}
          disabled={disabled}
        />
        <br />
      </div>
    );
  } else if (type === "boolean") {
    return (
      <div className="logDayDiv">
        {text}
        <br />
        <input
          onChange={handleResponseChange}
          type="radio"
          name="boolResponse"
          id="bResponse1"
          value={answers[date] ? answers[date] : ""}
          style={{ marginTop: "10px" }}
          disabled={disabled}
        />
        <label htmlFor="true" style={{ marginRight: "50px" }}>
          {" "}
          True{" "}
        </label>
        <input
          onChange={handleResponseChange}
          type="radio"
          name="boolResponse"
          id="bResponse2"
          value={answers[date] ? answers[date] : ""}
          disabled={disabled}
        />
        <label htmlFor="false">False</label>
        <br />
      </div>
    );
  } else if (type === "text") {
    return (
      <div className="logDayDiv">
        {text}
        <br />
        <input
          value={answers[date] ? answers[date] : ""}
          onChange={handleResponseChange}
          placeholder="Enter..."
          type="text"
          name="textResponse"
          id="textResponse"
          style={{
            marginTop: "5px",
            width: "-webkit-fill-available",
            padding: "5px",
            borderRadius: "5px",
          }}
          disabled={disabled}
        />
        <br />
      </div>
    );
  } else {
    // if(type==="multiplechoice")
    return (
      <div className="logDayDiv">
        <div
          style={{
            marginBottom: "10px",
          }}
        >
          {text}
        </div>

        <div
          style={{
            marginBottom: "10px",
          }}
        >
          <input
            onChange={handleResponseChange}
            type="radio"
            name="choiceResponse"
            id="choice1"
            value={answers[date] ? answers[date] : ""}
            disabled={disabled}
          />
          <label htmlFor="op1">{choice[0]}</label>
        </div>
        <div
          style={{
            marginBottom: "10px",
          }}
        >
          <input
            onChange={handleResponseChange}
            type="radio"
            name="choiceResponse"
            id="choice2"
            value={answers[date] ? answers[date] : ""}
            // value={answers[date] || ""}
            disabled={disabled}
          />
          <label htmlFor="op2">{choice[1]}</label>
        </div>

        <div
          style={{
            marginBottom: "5px",
          }}
        >
          <input
            onChange={handleResponseChange}
            type="radio"
            name="choiceResponse"
            id="choice3"
            value={answers[date] ? answers[date] : ""}
            disabled={disabled}
          />
          <label htmlFor="op3">{choice[2]}</label>
        </div>
      </div>
    );
  }
}

export default LogDayQuestions;
