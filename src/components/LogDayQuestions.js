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
  useEffect(() => {
    // console.log(date);
    // console.log(answers);
  }, [date]);

  const [responses, setResponses] = useState([]);

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
    setResponses({ ...responses, [date]: e.target.value });
  };

  const handleBooleanChange = (e) => {
    console.log(e);
    setResponses({ ...responses, [date]: e.target.value });
  };

  const handleMultipleChange = (e, idx) => {
    setResponses({ ...responses, [date]: e.target.checked ? idx : -1 });
  };

  if (type === "number") {
    return (
      <div className="logDayDiv">
        {text}
        <br />
        <input
          value={answers[date] || ""}
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
    // console.log(answers[date]);
    return (
      <div className="logDayDiv">
        {text}
        <br />
        <input
          onChange={handleBooleanChange}
          type="radio"
          name="boolResponse"
          id="bResponse1"
          // value={answers ? "true" :""}
          value={answers[date] || true}
          style={{ marginTop: "10px" }}
          disabled={disabled}
        />
        <label htmlFor="true" style={{ marginRight: "50px" }}>
          True
        </label>
        <input
          onChange={handleBooleanChange}
          type="radio"
          name="boolResponse"
          id="bResponse2"
          // value={answers[date] ? false : ""}
          value={answers[date] || false}
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
          value={answers ? answers[date] : ""}
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
            onChange={(e) => handleMultipleChange(e, 0)}
            type="radio"
            name="choiceResponse"
            id="choice1"
            value={answers[date] === 0 ? true : false}
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
            onChange={(e) => handleMultipleChange(e, 1)}
            type="radio"
            name="choiceResponse"
            id="choice2"
            value={answers[date] === 1 ? true : false}
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
            onChange={(e) => handleMultipleChange(e, 2)}
            type="radio"
            name="choiceResponse"
            id="choice3"
            value={answers[date] === 2 ? true : false}
            disabled={disabled}
          />
          <label htmlFor="op3">{choice[2]}</label>
        </div>
      </div>
    );
  }
}

export default LogDayQuestions;
