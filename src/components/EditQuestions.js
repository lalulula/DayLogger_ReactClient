import React, { useState, useEffect } from "react";
import Question from "./Question";
// import {nanoid} from 'nanoid';
import {createQuestionAPI} from "../api/questionAPI";
function EditQuestions({ handleSubmit, questions, setQuestions }) {

  useEffect(() => {
    console.log("RELOADING QUESTIONS");
    console.log("QUESTIONS:", questions);
  }, [questions]);

  const handleAddQuestion = () => {
    const newQuestion = {
      text: "Enter question",
      type: "number"
      // ,
      // id: nanoid(),
    };
    setQuestions([...questions, newQuestion]);
  };

  const handleDeleteQuestion = (e) => {
    let index2Delete = -1;
    for (let i = 0 ; i < questions.length; i++){
      if(questions[i]._id === e.target._id){
        index2Delete = i;
      }
    }
    console.log("🚀 ~ file: EditQuestions.js ~ line 23 ~ handleDeleteQuestion ~ index2Delete", index2Delete)
    let newQuestions = [...questions];
    newQuestions.splice( index2Delete , 1 );
    setQuestions(newQuestions);
  };

  const saveQuestions = () =>{
  //   createQuestionAPI(newQuestion.text, newQuestion.type).then((response) => {
  //     console.log("Created the note on the server");
  //     console.dir(response);
  //     setQuestions([...questions, newQuestion]);
  // })
  }


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
              key={question._id}
              id={question._id}
              text={question.text}
              type={question.type}
              questions={questions}
              setQuestions={setQuestions}
              handleDeleteQuestion={handleDeleteQuestion}
            />
          ))}
        </div>
        <button className="saveBtn" onClick={saveQuestions}>Save</button>
      </form>
    </div>
  );
}

export default EditQuestions;