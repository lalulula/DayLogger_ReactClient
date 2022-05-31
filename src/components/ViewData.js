import React from "react";
import LogDay from "./LogDay";
import { useState } from "react";

function ViewData({ handleSubmit, questions, setQuestions, user }) {
  const [viewMode, setViewMode] = useState("by-question");
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
          <div>by-question</div>
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
