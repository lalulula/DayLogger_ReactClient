import React, { useCallback, useEffect, useState } from "react";
import {updateQuestionAPI} from "../api/questionAPI";
function Question({ user, id, text,type, choice, questions, setQuestions, handleDeleteQuestion }) {
  const [questionType, setquestionType] = useState(type);
  const [questionText, setquestionText] = useState(text);
  const [multipleChoice, setMultipleChoice] = useState(choice);

  const handleTypeChange = (e) => {
    setquestionType(e.target.value);
    const newQuestion = {
      questionText: questionText,
      questionType: e.target.value,
      multipleChoice: multipleChoice,
      user :user
    };
    const updatedQuestions = [
      ...questions.map((q) => (q._id === id ? newQuestion : q)),
    ];
    setQuestions(updatedQuestions);
    saveQuestionOnServer(newQuestion);
  };

  const handleTextChange = (e) => {
    setquestionText(e.target.value);
    const newQuestion = {
      questionText: e.target.value,
      questionType: questionType,
      multipleChoice: multipleChoice,
      user :user
    };
    const updatedQuestions = [
      ...questions.map((q) => (q._id === id ? newQuestion : q)),
    ];
    setQuestions(updatedQuestions);
    saveQuestionOnServer(newQuestion);
  };

  const handleEditMultipleChoice = (e) =>{
    let optionIndex = e.target.name;
    console.log(optionIndex);
    if(optionIndex === "op1"){
      setMultipleChoice([e.target.value, multipleChoice[1], multipleChoice[2]]);
      const newQuestion = {
        questionText: questionText,
        questionType: questionType,
        multipleChoice: multipleChoice,
        user :user
      };
      const updatedQuestions = [
        ...questions.map((q) => (q._id === id ? newQuestion : q)),
      ];
      setQuestions(updatedQuestions);
      saveQuestionOnServer(newQuestion);
    }
    else if(optionIndex === "op2"){
      setMultipleChoice([multipleChoice[0], e.target.value, multipleChoice[2]]);
      const newQuestion = {
        questionText: questionText,
        questionType: questionType,
        multipleChoice: multipleChoice,
        user :user
      };
      const updatedQuestions = [
        ...questions.map((q) => (q._id === id ? newQuestion : q)),
      ];
      setQuestions(updatedQuestions);
      saveQuestionOnServer(newQuestion);
    }
    else if(optionIndex === "op3"){
      setMultipleChoice([multipleChoice[0], multipleChoice[1],e.target.value]);
      const newQuestion = {
        questionText: questionText,
        questionType: questionType,
        multipleChoice: multipleChoice,
        user :user
      };
      const updatedQuestions = [
        ...questions.map((q) => (q._id === id ? newQuestion : q)),
      ];
      setQuestions(updatedQuestions);
      saveQuestionOnServer(newQuestion);
      
    }
  }

  function debounce(func, timeout=1000){
    let timer;
    return(...args) => {
      clearTimeout(timer);
      timer = setTimeout(()=>{func.apply (this, args);} , timeout);
    }
  }

  const saveQuestionOnServer = useCallback(debounce(( question ) => {
    console.log(question._id);
    updateQuestionAPI(question._id).then((res)=>{
      console.dir(res);
    }).catch((err)=>{
      console.error('Error retrieving question data: ', err);
    })
  }), []);

  //NOTE: rendering method here
  if (questionType === "multipleChoice") {
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
          <input type="radio" name="op1" value={multipleChoice[0]} onChange={handleEditMultipleChoice} disabled />
          <label>choice1</label>
          <br />
          <input type="radio" name="op2" value={multipleChoice[1]} onChange={handleEditMultipleChoice} disabled />
          <label>choice1</label>
          <br />
          <input type="radio" name="op3" value={multipleChoice[2]} onChange={handleEditMultipleChoice} disabled />
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