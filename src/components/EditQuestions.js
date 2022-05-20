import React, { useState, useEffect } from "react";
import Question from "./Question";
function EditQuestions({ handleSubmit, questions, setQuestions }) {

  useEffect(() => {
    console.log("RELOADING QUESTIONS");
    console.log("QUESTIONS:", questions);
  }, [questions]);

  const handleAddQuestion = () => {
    const newQuestion = {
      text: "Enter text",
      type: "number",
      id: questions.length,
    };
    setQuestions([...questions, newQuestion]);
  };

  const handleDeleteQuestion = (e) => {
    console.log("Clicked: ID to delete:", e.target.id);
    // console.log("🚀 ~ file: EditQuestions.js ~ line 26 ~ handleDeleteQuestion ~ clickedIcon", e.target.id)
    // let index2Delete = -1;
    // for (let i = 0 ; i < questions.length; i++){
    //   if(questions[i].id === parseInt(e.target.id)){
    //     console.log("FOUND");
    //     index2Delete = i;
    //     break;
    //   }
    //   else{
    //     console.log("NOT FOUND");
    //   }
    // }
    // console.log("🚀 ~ file: EditQuestions.js ~ line 23 ~ handleDeleteQuestion ~ index2Delete", index2Delete)
    // let newQuestions = [...questions];

    // // remove object
    // // newQuestions.splice( index2Delete , 1 );
    // newQuestions = questions.filter((question) => question.id !== index2Delete);
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
              key={question.id}
              id={question.id}
              text={question.text}
              type={question.type}
              questions={questions}
              setQuestions={setQuestions}
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