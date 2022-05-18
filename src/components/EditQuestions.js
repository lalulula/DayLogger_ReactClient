import React, {  useEffect } from "react";
import Question from "./Question";

function EditQuestions({handleSubmit, questions, setQuestions}) {

  useEffect(() => {
    console.log("RELOADING QUESTIONS");
    console.log("QUESTIONS:", questions);
  }, [questions]);
  const handleAddQuestion = () => {
    const newQuestion = {
      text: "Enter text",
      type: "Number",
      id: questions.length,
    };
    console.log("New Q",newQuestion);
    setQuestions([...questions, newQuestion]);

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
              key={question.id}
              id={question.id}
              // text={question.text}
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
