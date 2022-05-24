import React, { useCallback, useEffect, useState } from "react";
function LogDayQuestions({ user, key, id, text, type, choice }) {
  
    if(type=="number"){
      return (
      <div className="logDayDiv">
          {text}
          <br/>
          <input
            type="text"
            name="text"
            style={{ marginTop: "5px", padding: "5px", borderRadius: "5px" }} />
          <br />
       </div>
        );
    }

    else if(type=="text"){
      return (
        <div className="logDayDiv">
          {text}
          <br />
          <input
            type="radio"
            name="tfchecked"
            value="true"
            style={{ marginTop: "10px" }} />
          <label htmlFor="true" style={{ marginRight: "50px" }}>
            True
          </label>
          <input type="radio" name="tfchecked" value="false" />
          <label htmlFor="false">False</label>
          <br />
        </div>
      );
    }

    else if(type=="boolean"){
      return (
        <div className="logDayDiv">
          {text}
          <br />
          <input
            type="text"
            name="onething"
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

    else{ // if(type=="multiplechoice")
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
            <input type="radio" name="op1" value={choice[0]} />
            <label htmlFor="op1">{choice[0]}</label>
          </div>
          <div
            style={{
              marginBottom: "10px",
            }}
          >
            <input type="radio" name="op2" value={choice[1]} />
            <label htmlFor="op2">{choice[1]}</label>
          </div>

          <div
            style={{
              marginBottom: "5px",
            }}
          >
            <input type="radio" name="op3" value={choice[2]} />
            <label htmlFor="op3">{choice[2]}</label>
          </div>
        </div>

      );
    }
  }

export default LogDayQuestions;