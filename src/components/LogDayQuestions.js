import React, { useCallback, useEffect, useState } from "react";


function LogDayQuestions({user,  id, text, type, choice, date, questions, setQuestions, responses, setResponse }) {
  // const[responses, setResponse] = useState([]);  

  useEffect(()=>{
    const newQuestion = {
      _id: id,
      questionText: text,
      questionType: type,
      multipleChoice: choice,
      user: user,
      responses : responses,
      date : date
    };
    const updatedQuestions = [
      ...questions.map((q) => (q._id === id ? newQuestion : q)),
    ];
    setQuestions(updatedQuestions);
  },[responses])

  const handleResponseChange = (e) =>{
    setResponse( {...responses, [date]: e.target.value});
  }
    if(type==="number"){
      return (
      <div className="logDayDiv">
          {text}
          <br/>
          <input
            onChange={handleResponseChange}
            type="numeric"
            name="numResponse"
            id="numResponse"
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
          <input onChange={handleResponseChange} type="radio" name="boolResponse" id="bResponse1" value="true" style={{ marginTop: "10px" }} />
          <label htmlFor="true" style={{ marginRight: "50px" }}> True   </label>
          <input onChange={handleResponseChange} type="radio" name="boolResponse" id="bResponse2" value="false" />
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
            id="textResponse"
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
            <input onChange={handleResponseChange} type="radio" name="choiceResponse" id="choice1" value={choice[0]} />
            <label htmlFor="op1">{choice[0]}</label>
          </div>
          <div
            style={{
              marginBottom: "10px",
            }}
          >
            <input onChange={handleResponseChange} type="radio" name="choiceResponse" id="choice2" value={choice[1]} />
            <label htmlFor="op2">{choice[1]}</label>
          </div>

          <div
            style={{
              marginBottom: "5px",
            }}
          >
            <input onChange={handleResponseChange} type="radio" name="choiceResponse" id="choice3" value={choice[2]} />
            <label htmlFor="op3">{choice[2]}</label>
          </div>
        </div>

      );
    }
  }

export default LogDayQuestions;