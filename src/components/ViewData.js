import React from "react";
import LogDay from "./LogDay";
import { useState } from "react";
import ReactApexChart from "react-apexcharts";

function ViewData({ handleSubmit, questions, setQuestions, user }) {
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
          series={[44, 55]}
          type="pie"
          width={380}
        />
      </div>
    );
  };
  const numberType = (question) => {
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
              // data: [10, 41, 35, 51, 49, 62, 69, 91, 148],
              data: [
                {
                  x: "2020/01/01",
                  y: 540,
                },
                {
                  x: "2020/04/01",
                  y: 580,
                },
                {
                  x: "2020/07/01",
                  y: 800,
                },
                {
                  x: "2020/10/01",
                  y: 690,
                },
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
                "South Korea",
                "Canada",
                "United Kingdom",
                "Netherlands",
                "Italy",
                "France",
                "Japan",
                "United States",
                "China",
                "Germany",
              ],
            },
          }}
          series={[
            {
              data: [400, 430, 448, 470, 540, 580, 690, 1100, 1200, 1380],
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
