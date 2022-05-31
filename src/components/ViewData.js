import React from "react";
import LogDay from "./LogDay";
import { useState } from "react";
import ReactApexChart from "react-apexcharts";

function ViewData({ handleSubmit, questions, setQuestions, user }) {
  console.log(questions);
  const [viewMode, setViewMode] = useState("by-question");

  const textType = (question) => {
    return (
      <div className="chart-box">
        <div className="question-text">{question?.questionText}</div>
        {Object.keys(question.responses).map((date) => {
          return (
            <div key={`response-${date}`} className="text-container">
              <div className="text-container-key">{date}</div>
              <div className="text-container-value">
                {question.responses[date]}
              </div>
            </div>
          );
        })}
      </div>
    );
  };
  const booleanType = (question) => {
    var numTrue = 0;
    var numFalse = 0;
    // console.log(question);
    // console.log(Object.values(question.responses));
    {
      Object.values(question.responses).map((response) => {
        if (response === true) {
          numTrue++;
          //   console.log(numTrue);
        } else {
          numFalse++;
          //   console.log(numFalse);
        }
      });
    }
    return (
      <div id="chart" className="chart-box">
        <div className="question-text">{question?.questionText}</div>

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
      </div>
    );
  };
  const numberType = (question) => {
    const numberData = Object.keys(question.responses).map((date) => {
      var responseNum = question.responses[date];
      return { date, responseNum };
    });
    // console.log(numberData);
    // for (let i = 0; i < numberData.length; i++) {
    // console.log(numberData[0].date);
    // }

    return (
      <div id="chart" className="chart-box">
        <div className="question-text">{question?.questionText}</div>

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
              data: [
                // { x: numberData[3].date, y: numberData[3].responseNum },
                // { x: numberData[4].date, y: numberData[4].responseNum },
              ],
            },
          ]}
          type="line"
          height={350}
        />
      </div>
    );
  };
  const multipleChoiceType = (question) => {
    console.log(question.multipleChoice);
    console.log(question);
    var option1Num = 0;
    var option2Num = 0;
    var option3Num = 0;

    {
      Object.values(question.responses).map((response) => {
        if (response === 0) {
          option1Num++;
        } else if (response === 1) {
          option2Num++;
        } else if (response === 2) {
          option3Num++;
        }
      });
    }

    return (
      <div id="chart" className="chart-box">
        <div className="question-text">{question?.questionText}</div>
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
      </div>
    );
  };

  return (
    <div>
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
