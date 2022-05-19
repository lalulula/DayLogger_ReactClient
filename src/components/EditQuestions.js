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
    console.log("addquestion: question", questions);
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
              text={question.text}
              type={question.type}
              questions={questions}
              setQuestions={setQuestions}
              handleDeleteQuestion={handleDeleteQuestion}
            />
          ))}
        </div>

        {/*  NOTE 얘넨 그냥 hardcode한 프론트 부분임
                <div className='qDiv'>
                    <input type="text" name='qText' value='Number of pushups' style={{marginBottom:"5px", width:"-webkit-fill-available"}}/><br/>
                    <div className='qContainer'>
                        <select name="qType" id="qType">
                            <option value="number" selected>number</option>
                            <option value="text">text</option>
                            <option value="boolean">boolean</option>
                            <option value="multipleChoice">multiple choice</option>
                        </select>
                        <span className="material-symbols-outlined">delete</span>
                    </div>
                </div>
                <div className='qDiv'>
                    <input type="text" name='qText' value='Had a long walk today' style={{marginBottom:"5px", width:"-webkit-fill-available"}}/><br/>
                    <div className='qContainer'>
                        <select name="qType" id="qType">
                            <option value="number">number</option>
                            <option value="text">text</option>
                            <option value="boolean" selected>boolean</option>
                            <option value="multipleChoice">multiple choice</option>
                        </select>
                        <span className="material-symbols-outlined">delete</span>
                    </div>
                </div>
                <div className='qDiv'>
                    <input type="text" name='qText' value='One great thing that happened today' style={{marginBottom:"5px", width:"-webkit-fill-available"}}/><br/>
                    <div className='qContainer'>
                        <select name="qType" id="qType">
                            <option value="number">number</option>
                            <option value="text" selected>text</option>
                            <option value="boolean">boolean</option>
                            <option value="multipleChoice">multiple choice</option>
                        </select>
                        <span className="material-symbols-outlined">delete</span>
                    </div>
                </div>
                <div className='qDiv'>
                    <input type="text" name='qText' value='Today was a:' style={{marginBottom:"5px" , width:"-webkit-fill-available"}}/><br/>
                    <div className='qContainer'> 
                        <select name="qType" id="qType">
                            <option value="number" >number</option>
                            <option value="text">text</option>
                            <option value="boolean">boolean</option>
                            <option value="multipleChoice" selected>multiple choice</option>
                        </select>
                        <span className="material-symbols-outlined">delete</span>
                    </div>
                </div>    */}

        <button className="saveBtn">Save</button>
      </form>
    </div>
  );
}

export default EditQuestions;
