import React, { useEffect, useState } from "react";

function Question({ id, text, questions, setQuestions, handleDeleteQuestion }) {
  const [questionType, setquestionType] = useState("number");

  // useEffect(() => {
  //   const newQuestion = {
  //     text: "Enter text",
  //     type: questionType,
  //     id: id,
  //   };
  //   console.log("New Question", newQuestion);
  //   console.log(id);
  //   // const updatedQuestions = questions.splice(id, 1, newQuestion);
  //   // console.log("UpdatedQuestions", updatedQuestions);
  //   // setQuestions(updatedQuestions);
  //   const updatedQuestions = [
  //     ...questions.map((q) => (q.id === id ? newQuestion : q)),
  //   ];
  //   setQuestions(updatedQuestions);
  // }, [questionType]);

  const handleTypeChange = (e) => {
    setquestionType(e.target.value);
    console.log("ID", id);
    // console.log("question type", questionType);
    const newQuestion = {
      text: "Enter text",
      type: e.target.value,
      id: id,
    };
    console.log("New Question", newQuestion);
    console.log(id);
    // const updatedQuestions = questions.splice(id, 1, newQuestion);
    // console.log("UpdatedQuestions", updatedQuestions);
    // setQuestions(updatedQuestions);
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
          defaultValue={text}
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
        defaultValue={text}
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
