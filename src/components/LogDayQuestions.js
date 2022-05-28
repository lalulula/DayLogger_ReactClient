import React, { useCallback, useEffect, useState } from "react";


function LogDayQuestions({user,  id, text, type, choice, questions, setQuestions }) {
  const[response, setResponse] = useState([]);  

  useEffect(()=>{
    console.log("updating response");
    console.log("🚀 ~ file: LogDayQuestions.js ~ line 12 ~ LogDayQuestions ~ response", response)
    const newQuestion = {
      _id: id,
      questionText: text,
      questionType: type,
      multipleChoice: choice,
      user: user,
      responses : response
    };
    const updatedQuestions = [
      ...questions.map((q) => (q._id === id ? newQuestion : q)),
    ];
    setQuestions(updatedQuestions);
    // console.table(questions)
  },[response])

  const handleResponseChange = (e) =>{
    setResponse({[e.target.name]:e.target.value});
  }
    if(type==="number"){
      return (
      <div className="logDayDiv">
          {text}
          <br/>
          <input
            onChange={handleResponseChange}
            type="text"
            name="textResponse"
            placeholder="Enter..."
            style={{ marginTop: "5px", padding: "5px", borderRadius: "5px" }} />
          <br />
       </div>
        );
    }
    
    else if(type==="boolean"){
      return (
        <div className="logDayDiv">
          {text}
          <br />
          <input onChange={handleResponseChange} type="radio" name="boolResponse"  value="true" style={{ marginTop: "10px" }} />
          <label htmlFor="true" style={{ marginRight: "50px" }}> True   </label>
          <input onChange={handleResponseChange} type="radio" name="boolResponse" value="false" />
          <label htmlFor="false">False</label>
          <br />
        </div>
      );
    }

    else if(type==="text"){
      return (
        <div className="logDayDiv">
          {text}
          <br />
          <input
            onChange={handleResponseChange}
            placeholder="Enter..."
            type="text"
            name="textResponse"
            style={{
              marginTop: "5px",
              width: "-webkit-fill-available",
              padding: "5px",
              borderRadius: "5px",
            }} />
          <br />
        </div>
      );
    }

    else{ // if(type==="multiplechoice")
      return (
        <div className="logDayDiv"> 
          <div
            style={{
              marginBottom: "10px",
            }}
          >
            {text}
          </div>

          <div
            style={{
              marginBottom: "10px",
            }}
          >
            <input onChange={handleResponseChange} type="radio" name="choiceResponse" value={choice[0]} />
            <label htmlFor="op1">{choice[0]}</label>
          </div>
          <div
            style={{
              marginBottom: "10px",
            }}
          >
            <input onChange={handleResponseChange} type="radio" name="choiceResponse" value={choice[1]} />
            <label htmlFor="op2">{choice[1]}</label>
          </div>

          <div
            style={{
              marginBottom: "5px",
            }}
          >
            <input onChange={handleResponseChange} type="radio" name="choiceResponse" value={choice[2]} />
            <label htmlFor="op3">{choice[2]}</label>
          </div>
        </div>

      );
    }
  }

export default LogDayQuestions;