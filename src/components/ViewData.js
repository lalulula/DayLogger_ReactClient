import React from "react";
import LogDay from "./LogDay";
import { useState, useEffect } from "react";

import ReactApexChart from "react-apexcharts";
import { getUserAPI } from "../api/userAPI";

function ViewData({ handleSubmit, questions, setQuestions, user }) {
  //   console.log(questions);
  const [viewMode, setViewMode] = useState("by-question");

  const sortByDate = (arr) => {
    return arr.sort(function (a, b) {
      return new Date(a) - new Date(b);
    });
  };

  // ANCHOR csv file download code ////////////////////////////////////////////////
  let responseArray = [];

  const [currUser, setCurrUser] = useState("");
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await getUserAPI();
        setCurrUser(userData);
      } catch (e) {
        console.log(e);
      }
    };
    fetchUserData();
  }, []);

  for (let i = 0; i < questions.length; i++) {
    responseArray[i] = questions[i].responses;
  }

  const downloadFile = ({ data, fileName, fileType }) => {
    const blob = new Blob([data], { type: fileType });
    const a = document.createElement("a");
    a.download = fileName;
    a.href = window.URL.createObjectURL(blob);
    const clickEvt = new MouseEvent("click", {
      view: window,
      bubbles: true,
      cancelable: true,
    });
    a.dispatchEvent(clickEvt);
    a.remove();
  };
  const exportToJson = (e) => {
    e.preventDefault();
    console.log(user);
    downloadFile({
      data: JSON.stringify({ user, questions, responseArray }),
      fileName: `${currUser.name}.json`,
      fileType: "text/json",
    });
  };
  // ANCHOR csv file download code ////////////////////////////////////////////////

  const textType = (question) => {
    return (
      <div className="chart-box">
        <div className="question-text">{question?.questionText}</div>
        {Object.values(question.responses) != "" &&
        Object.values(question.responses).length != 0 ? (
          Object.keys(question.responses).map((date) => {
            return (
              <div key={`response-${date}`} className="text-container">
                <div className="text-container-key">{date}</div>
                <div className="text-container-value">
                  {question.responses[date]}
                </div>
              </div>
            );
          })
        ) : (
          <div className="nodata">You need data to view data!</div>
        )}
      </div>
    );
  };
  const booleanType = (question) => {
    var numTrue = 0;
    var numFalse = 0;
    {
      // console.log(question.responses);
      sortByDate(Object.values(question.responses)).map((response) => {
        if (response === "true") {
          numTrue++;
        } else if (response === "false") {
          numFalse++;
        } else {
          console.log("undefined response");
        }
      });
    }
    return (
      <div id="chart" className="chart-box">
        <div className="question-text">{question?.questionText}</div>
        {Object.values(question.responses) != "" &&
        Object.values(question.responses).length != 0 ? (
          <ReactApexChart
            options={{
              chart: {
                width: 380,
                type: "pie",
              },
              labels: ["True", "False"],
              responsive: [
                {
                  breakpoint: 480,
                  options: {
                    chart: {
                      width: 200,
                    },
                    legend: {
                      position: "bottom",
                    },
                  },
                },
              ],
            }}
            series={[numTrue, numFalse]}
            type="pie"
            width={380}
          />
        ) : (
          <div className="nodata">You need data to view chart!</div>
        )}
      </div>
    );
  };
  const numberType = (question) => {
    // console.log(question.responses == "");
    // console.log(Object.values(question.responses) == "");
    // console.log(Object.values(question.responses).length);
    const numberData = sortByDate(Object.keys(question.responses)).map(
      (date) => {
        var responseNum = question.responses[date];
        return { date, responseNum };
      }
    );

    return (
      <div id="chart" className="chart-box">
        <div className="question-text">{question?.questionText}</div>

        {Object.values(question.responses) != "" &&
        Object.values(question.responses).length != 0 ? (
          <ReactApexChart
            options={{
              chart: {
                height: 350,
                type: "line",
                zoom: {
                  enabled: false,
                },
              },
            }}
            series={[
              {
                name: "VALUE",
                data: numberData.map((data) => {
                  return { x: data.date, y: data.responseNum };
                }),
              },
            ]}
            type="line"
            height={350}
          />
        ) : (
          <div className="nodata">You need data to view chart!</div>
        )}
      </div>
    );
  };
  const multipleChoiceType = (question) => {
    var option1Choice = question.multipleChoice[0];
    var option2Choice = question.multipleChoice[1];
    var option3Choice = question.multipleChoice[2];

    var option1Num = 0;
    var option2Num = 0;
    var option3Num = 0;

    {
      Object.keys(question.responses).map((date) => {
        var qr = question.responses[date];

        if (qr === option1Choice) {
          option1Num++;
        } else if (qr === option2Choice) {
          option2Num++;
        } else if (qr === option3Choice) {
          option3Num++;
        } else {
          console.log("undefined response");
        }
      });
    }

    return (
      <div id="chart" className="chart-box">
        <div className="question-text">{question?.questionText}</div>

        {Object.values(question.responses) != "" &&
        Object.values(question.responses).length != 0 ? (
          <ReactApexChart
            options={{
              chart: {
                type: "bar",
                height: 350,
              },
              plotOptions: {
                bar: {
                  borderRadius: 4,
                  horizontal: true,
                },
              },
              dataLabels: {
                enabled: false,
              },
              xaxis: {
                categories: [
                  question.multipleChoice[0],
                  question.multipleChoice[1],
                  question.multipleChoice[2],
                ],
              },
            }}
            series={[
              {
                name: "VALUE",
                data: [option1Num, option2Num, option3Num],
              },
            ]}
            type="bar"
            height={350}
          />
        ) : (
          <div className="nodata">You need data to view chart!</div>
        )}
      </div>
    );
  };

  return (
    <div style={{ textAlign: "-webkit-center" }}>
      <div className="view-data-container">
        <h2>View Data</h2>
        <div>
          <select
            className="view-data-select"
            value={viewMode}
            onChange={(e) => setViewMode(e.currentTarget.value)}
          >
            <option value="by-question">By question</option>
            <option value="by-date">By value</option>
          </select>
        </div>
      </div>
      <div id="csvDownload">
        <span onClick={exportToJson}>Save Data</span>
      </div>
      <div>
        {viewMode === "by-question" ? (
          questions.map((question, idx) => {
            switch (question.questionType) {
              case "text":
                return <div key={idx}>{textType(question)}</div>;
              case "number":
                return <div key={idx}>{numberType(question)}</div>;
              case "multipleChoice":
                return <div key={idx}>{multipleChoiceType(question)}</div>;
              case "boolean":
                return <div key={idx}>{booleanType(question)}</div>;
            }
          })
        ) : (
          <LogDay
            handleSubmit={handleSubmit}
            user={user}
            questions={questions}
            setQuestions={setQuestions}
            disabled
          ></LogDay>
        )}
      </div>
    </div>
  );
}

export default ViewData;
