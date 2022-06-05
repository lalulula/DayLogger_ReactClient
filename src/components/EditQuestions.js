import React, { useState, useEffect } from "react";
import Question from "./Question";
import { createQuestionAPI, deleteQuestionAPI } from "../api/questionAPI";
function EditQuestions({ handleSubmit, questions, setQuestions, user }) {
  // useEffect(() => {
  //   console.log("RELOADING QUESTIONS");
  //   console.log("QUESTIONS:", questions);
  // }, [questions]);

  const handleAddQuestion = () => {
    const newQuestion = {
      questionText: "",
      questionType: "number",
      multipleChoice: ["", "", ""],
      user: user,
      responses: {},
    };
    createQuestionAPI(newQuestion).then((response) => {
      setQuestions([response, ...questions]);
    });
  };

  const handleDeleteQuestion = (e) => {
    let index2Delete = -1;
    let question2Delete;
    for (let i = 0; i < questions.length; i++) {
      if (questions[i]._id === e.target.id) {
        index2Delete = i;
        question2Delete = questions[i];
      }
    }
    deleteQuestionAPI(question2Delete._id).then(() => {
    });
    let newQuestions = [...questions];
    newQuestions.splice(index2Delete, 1);
    setQuestions(newQuestions);
  };

  return (
    <div onSubmit={handleSubmit} className="editQContainer">
      <form className="editQContent">
        <div className="editQHeader">
          <h2>Edit Questions</h2>
          <span
            className="material-symbols-outlined addQuestionBtn"
            onClick={handleAddQuestion}
          >
            add_circle
          </span>
        </div>
        <div>
          {questions.map((question) => (
            <Question
              user={user}
              key={question._id}
              id={question._id}
              text={question.questionText}
              type={question.questionType}
              choice={question.multipleChoice}
              questions={questions}
              setQuestions={setQuestions}
              handleDeleteQuestion={handleDeleteQuestion}
              responses={question.responses}
            />
          ))}
        </div>
      </form>
    </div>
  );
}

export default EditQuestions;
