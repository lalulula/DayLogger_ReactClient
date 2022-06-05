import React, { useCallback, useEffect, useState } from "react";
import { updateQuestionAPI } from "../api/questionAPI";
function Question({
  user,
  id,
  text,
  type,
  choice,
  questions,
  setQuestions,
  handleDeleteQuestion,
  responses,
}) {
  const [questionType, setquestionType] = useState(type);
  const [questionText, setquestionText] = useState(text);
  const [multipleChoice, setMultipleChoice] = useState(choice);

  const handleTypeChange = (e) => {
    setquestionType(e.target.value);
    const newQuestion = {
      _id: id,
      questionText: questionText,
      questionType: e.target.value,
      multipleChoice: multipleChoice,
      user: user,
      responses: responses
    };

    saveQuestionOnServer(newQuestion, questions);
  };

  const handleTextChange = (e) => {
    setquestionText(e.target.value);
    const newQuestion = {
      _id: id,
      questionText: e.target.value,
      questionType: questionType,
      multipleChoice: multipleChoice,
      user: user,
      responses: responses
    };
    saveQuestionOnServer(newQuestion, questions);
  };

  const handleEditMultipleChoice = (e) => {
    let optionIndex = e.target.name;
    // console.log(optionIndex);
    if (optionIndex === "op1") {
      const newMultChoice = [
        e.target.value,
        multipleChoice[1],
        multipleChoice[2],
      ];
      setMultipleChoice(newMultChoice);
      const newQuestion = {
        _id: id,
        questionText: questionText,
        questionType: questionType,
        multipleChoice: newMultChoice,
        user: user,
        responses: responses,
      };
      const updatedQuestions = [
        ...questions.map((q) => (q._id === id ? newQuestion : q)),
      ];
      setQuestions(updatedQuestions);
      saveQuestionOnServer(newQuestion, questions);
    } else if (optionIndex === "op2") {
      const newMultChoice = [
        multipleChoice[0],
        e.target.value,
        multipleChoice[2],
      ];
      setMultipleChoice(newMultChoice);
      const newQuestion = {
        _id: id,
        questionText: questionText,
        questionType: questionType,
        multipleChoice: newMultChoice,
        user: user,
        responses: responses,
      };
      const updatedQuestions = [
        ...questions.map((q) => (q._id === id ? newQuestion : q)),
      ];
      setQuestions(updatedQuestions);
      saveQuestionOnServer(newQuestion, questions);
    } else if (optionIndex === "op3") {
      const newMultChoice = [
        multipleChoice[0],
        multipleChoice[1],
        e.target.value,
      ];
      setMultipleChoice(newMultChoice);
      const newQuestion = {
        _id: id,
        questionText: questionText,
        questionType: questionType,
        multipleChoice: newMultChoice,
        user: user,
        responses: responses,
      };

      saveQuestionOnServer(newQuestion, questions);
    }
  };

  function debounce(func, timeout = 300) {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func.apply(this, args);
      }, timeout);
    };
  }

  const saveQuestionOnServer = useCallback(
    debounce((question, questions) => {
      updateQuestionAPI(question)
        .then((res) => {
          const updatedQuestions = [
            ...questions.map((q) => (q._id === id ? question : q)),
          ];
          setQuestions(updatedQuestions);
        })
        .catch((err) => {
          console.error("Error retrieving question data: ", err);
        });
    }),
    []
  );

  //NOTE: rendering method here
  if (questionType === "multipleChoice") {
    return (
      <div className="qDiv">
        <input
          type="text"
          name="qText"
          placeholder="Enter question..."
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
          <div className="multChoiceDiv">
            <span className="material-icons radioBtn">
              radio_button_unchecked
            </span>
            <input
              type="text"
              name="op1"
              value={multipleChoice[0]}
              onChange={handleEditMultipleChoice}
              placeholder="option 1"
            />
          </div>
          <br />
          <div className="multChoiceDiv">
            <span className="material-icons radioBtn">
              radio_button_unchecked
            </span>
            <input
              type="text"
              name="op2"
              value={multipleChoice[1]}
              onChange={handleEditMultipleChoice}
              placeholder="option 2"
            />
          </div>
          <br />
          <div className="multChoiceDiv">
            <span className="material-icons radioBtn">
              radio_button_unchecked
            </span>
            <input
              type="text"
              name="op3"
              value={multipleChoice[2]}
              onChange={handleEditMultipleChoice}
              placeholder="option 3"
            />
          </div>
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
        placeholder="Enter question..."
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
    </div>
  );
}

export default Question;
