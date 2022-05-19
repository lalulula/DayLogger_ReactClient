import React, { useState, useEffect } from "react";
import Question from "./Question";
import { nanoid } from 'nanoid'
function EditQuestions({handleSubmit, questions, setQuestions}) {
  const [questionText, setQuestionText] = useState('');
  const [questionType, setQuestionType] = useState('');
  const [currId, setCurrId] = useState('');
  let i = 0;
  useEffect(() => {
    console.log("QUESTIONS:", questions);
  }, [questions]);

  useEffect(() => {
    console.log("Question type changed: Rerendering array");
    console.log("Current ID",currId);
    console.log("question type", questionType);
    handleRearrangeArray();
  }, [questionType]);

  const handleRearrangeArray = () =>{
    const newQuestion = {
      text: "Enter text",
      type:  questionType,
      id: nanoid(),
    };
    const newQuestions = questions.map( question => question.id !== currId ? question : newQuestion);
    console.log("🚀 ~ file: EditQuestions.js ~ line 26 ~ handleRearrangeArray ~ newQuestions", newQuestions) //Ctr-Alt-L
    setQuestions(newQuestions);
  }

  const handleAddQuestion = () => {
    const newQuestion = {
      text: "Enter text",
      type: "Number",
      id: nanoid(),
    };
    setQuestions([newQuestion,...questions]);
  };

  const handleDeleteQuestion = (e) => { 
    console.log("Target delete icon", e.target);
    console.log("Id of delete icon", e.target.id);
    console.log("Question to delete", questions[e.target.id]);
    // const newQuestions = questions.splice(e.target.id, 1); 
    // console.log(newQuestions)
    // setQuestions(newQuestions);
  };

  return (
    <div onSubmit={handleSubmit} className="editQContainer">
      <form className="editQContent">
        <div className="editQHeader">
          <h2
            style={{
              marginLeft: "10px",
            }}
          >
            Edit Questions
          </h2>
          <span
            className="material-symbols-outlined"
            onClick={handleAddQuestion}
          >
            add_circle
          </span>
        </div>
        <div>
          {questions.map((question) => (
            <Question
              questionType={questionType}
              setQuestionType={setQuestionType}
              setCurrId = {setCurrId}
              key={question.id}
              id={question.id}
              text={question.text}
              type={question.type}
              handleDeleteQuestion={handleDeleteQuestion}
            />
          ))}
        </div> 
        <button className="saveBtn">Save</button>
      </form>
    </div>
  );
}

export default EditQuestions;