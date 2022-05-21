import React, { useEffect, useState } from "react";

function Question({ id, text,type, questions, setQuestions, handleDeleteQuestion }) {
  const [questionType, setquestionType] = useState(type);
  const [questionText, setquestionText] = useState(text);

  const handleTypeChange = (e) => {
    setquestionType(e.target.value);
    const newQuestion = {
      text: questionText,
      type: e.target.value,
      id: id,
    };
    const updatedQuestions = [
      ...questions.map((q) => (q.id === id ? newQuestion : q)),
    ];
    setQuestions(updatedQuestions);
  };

  const handleTextChange = (e) => {
    setquestionText(e.target.value);
    const newQuestion = {
      text: e.target.value,
      type: questionType ,
      id: id,
    };
    const updatedQuestions = [
      ...questions.map((q) => (q.id === id ? newQuestion : q)),
    ];
    setQuestions(updatedQuestions);
  };

  if (questionType == "multipleChoice") {
    return (
      <div className="qDiv">
        <input
          type="text"
          name="qText"
          onChange={handleTextChange}
          value={questionText}
          style={{
            marginBottom: "5px",
            width: "-webkit-fill-available",
            padding: "4px",
            borderRadius: "5px",
          }}
        />
        <br />
        <div className="qContainer">
          <select
            name="qType"
            id="qType"
            style={{
              marginTop: "5px",
              padding: "5px",
              borderRadius: "5px",
            }}
            onChange={handleTypeChange}
            value={questionType}
          >
            <option value="number">number</option>
            <option value="text">text</option>
            <option value="boolean">boolean</option>
            <option value="multipleChoice">multiple choice</option>
          </select>
          <span
            className="material-symbols-outlined"
            id={id}
            onClick={handleDeleteQuestion}
            style={{
              marginTop: "7px",
            }}
          >
            delete
          </span>
        </div>

        <div className="multipleChoice">
          <input type="radio" name="op1" value="choice1" disabled />
          <label>choice1</label>
          <br />
          <input type="radio" name="op2" value="choice2" disabled />
          <label>choice1</label>
          <br />
          <input type="radio" name="op3" value="choice3" disabled />
          <label>choice1</label>
          <br />
        </div>
      </div>
    );
  }

  return (
    <div className="qDiv">
      <input
        type="text"
        name="qText"
        onChange={handleTextChange}
        value={questionText}
        style={{
          marginBottom: "5px",
          width: "-webkit-fill-available",
          padding: "4px",
          borderRadius: "5px",
        }}
      />
      <br />
      <div className="qContainer">
        <select
          name="qType"
          id="qType"
          style={{
            marginTop: "5px",
            padding: "5px",
            borderRadius: "5px",
          }}
          onChange={handleTypeChange}
        >
          <option value="number">number</option>
          <option value="text">text</option>
          <option value="boolean">boolean</option>
          <option value="multipleChoice">multiple choice</option>
        </select>
        <span
          className="material-symbols-outlined"
          id={id}
          onClick={handleDeleteQuestion}
          style={{
            marginTop: "7px",
          }}
        >
          delete
        </span>
      </div>
    </div>
  );
}

export default Question;