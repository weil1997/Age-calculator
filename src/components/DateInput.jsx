import React, { useState } from "react";
import "./Date.css";

const DateInput = () => {
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  const [dayError, setDayError] = useState(false);
  const [monthError, setMonthError] = useState(false);
  const [yearError, setYearError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="date">
      <form action="" className="date-form" onSubmit={handleSubmit}>
        <div className="date__controlls">
          <div className={`date__controll ${dayError ? "error" : ""}`}>
            <label htmlFor="day" className="date__control-label">
              Day
            </label>
            <input
              type="text"
              value={day}
              id="day"
              className={`date__input_day ${dayError ? "error" : ""}`}
            />
            <span className="error-message date">Must be a valid day</span>
          </div>
          <div className={`date__controll ${monthError ? "error" : ""}`}>
            <label htmlFor="month" className="date__control-label">
              Month
            </label>
            <input
              type="text"
              value={month}
              id="month"
              className={`date__input_month ${monthError ? "error" : ""}`}
            />
            <span className="error-message date">Must be a valid month</span>
          </div>
          <div className={`date__controll ${yearError ? "error" : ""}`}>
            <label htmlFor="year" className="date__control-label">
              Year
            </label>
            <input
              type="text"
              value={year}
              id="year"
              className={`date__input_year ${yearError ? "error" : ""}`}
            />
            <span className="error-message date">Must be a valid year</span>
          </div>
        </div>
      </form>
    </div>
  );
};

export default DateInput;
