import React, { useState, useEffect } from "react";
import Question from "./Question";
import {createQuestionAPI, deleteQuestionAPI} from "../api/questionAPI";
function EditQuestions({ handleSubmit, questions, setQuestions, user }) {

  useEffect(() => {
    console.log("RELOADING QUESTIONS");
    console.log("QUESTIONS:", questions);
  }, [questions]);

  const handleAddQuestion = () => {
    const newQuestion = {
      questionText: "Enter question",
      questionType: "number",
      multipleChoice:["option1","option2","option3"],
      user :user
    };
    createQuestionAPI(newQuestion).then((response) => {
      console.log("Created question on the server");
      console.dir(response);
      setQuestions([...questions, response]);
    });

  };

  const handleDeleteQuestion = (e) => {
    let index2Delete = -1;
    let question2Delete;
    for (let i = 0 ; i < questions.length; i++){
      if(questions[i]._id === e.target.id){
        index2Delete = i;
        question2Delete = questions[i];
      }
    }
    deleteQuestionAPI(question2Delete._id).then((response) => {
      console.log("Deleted the question on the server");
    });
    let newQuestions = [...questions];
    newQuestions.splice( index2Delete , 1 );
    setQuestions(newQuestions);
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
            <div  key={question._id}>
            <Question
              user={user}
              // key={question._id}
              id={question._id}
              text={question.questionText}
              type={question.questionType}
              choice={question.multipleChoice}
              questions={questions}
              setQuestions={setQuestions}
              handleDeleteQuestion={handleDeleteQuestion}
            />
            </div>
          ))}
        </div>

      </form>
    </div>
  );
}

export default EditQuestions;