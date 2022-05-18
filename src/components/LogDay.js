import React from "react";

function LogDay({handleSubmit}) {

  const handleDateBack = () =>{
    console.log("Date Back");
  }
  const handleDateForward = () =>{
    console.log("Date Forward");
  }

  return (
    <div className="logDayContainer">
      <form onSubmit={handleSubmit} className="logDayContent">
        <div className="logDayDate">
          <button className="material-symbols-outlined dateBtn" onClick={handleDateBack}>arrow_back_ios</button>
          <h2> 2/21/2021 </h2>
          <button className="material-symbols-outlined dateBtn" onClick={handleDateForward}>arrow_forward_ios</button>
        </div>

        <div className="logDayDiv1">
          Number of pushups
          <br />
          <input
            type="text"
            name="pushup"
            style={{ marginTop: "5px", padding: "5px", borderRadius: "5px" }}
          />
          <br />
        </div>

        <div className="logDayDiv2">
          Had a long walk today
          <br />
          <input
            type="radio"
            name="tfchecked"
            value="true"
            style={{ marginTop: "10px" }}
          />
          <label htmlFor="true" style={{ marginRight: "50px" }}>
            True
          </label>
          <input type="radio" name="tfchecked" value="false" />
          <label htmlFor="false">False</label>
          <br />
        </div>

        <div className="logDayDiv3">
          One great thing that happened today
          <br />
          <input
            type="text"
            name="onething"
            style={{
              marginTop: "5px",
              width: "-webkit-fill-available",
              padding: "5px",
              borderRadius: "5px",
            }}
          />
          <br />
        </div>

        <div className="logDayDiv4">
          <div
            style={{
              marginBottom: "10px",
            }}
          >
            Today was a:
          </div>

          {/* <br /> */}
          <div
            style={{
              marginBottom: "10px",
            }}
          >
            <input type="radio" name="daycheck" value="Ok day" />
            <label htmlFor="Ok day">Ok day</label>
          </div>
          {/* <br /> */}
          <div
            style={{
              marginBottom: "10px",
            }}
          >
            <input type="radio" name="daycheck" value="Bad day" />
            <label htmlFor="Bad day">Bad day</label>
          </div>
          {/* <br /> */}
          <div
            style={{
              marginBottom: "5px",
            }}
          >
            <input type="radio" name="daycheck" value="Great day" />
            <label htmlFor="Great day">Great day</label>
          </div>
        </div>

        <button className="submitBtn">Submit</button>
      </form>
    </div>
  );
}

export default LogDay;
