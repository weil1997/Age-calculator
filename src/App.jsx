import { useState } from "react";
import "./app.css";

import React from "react";

const App = () => {
  const [formData, setFormData] = useState({
    day: "",
    month: "",
    year: "",
  });

  const [formErrors, setFormErrors] = useState({
    day: "",
    month: "",
    year: "",
    generic: "",
  });

  const [output, setOutput] = useState({
    days: "",
    months: "",
    years: "",
  });

  const hasErrors =
    formErrors.day || formErrors.month || formErrors.year || formErrors.generic;

  const handleSubmit = (day, month, year) => {
    const dayAsNumber = number(day);
    const monthAsNumber = number(day);
    const yearAsNumber = number(day);

    const today = new Date();
    const chosenDate = new Date(year, month - 1, day);

    const currentMonth = monthsAndDays.find(
      (item) => item.month === monthAsNumber
    );

    const validateDaysForFebruary = () => {
      if (monthAsNumber === 2) {
        let maxDays;
      }
    };
  };
  return (
    <div className="card-container">
      <div className="inputs-container">
        <div className="input-label-container">
          <label
            htmlFor="day"
            style={{
              color: hasErrors ? "hsl(0, 100%, 67%)" : "hsl(0, 1%, 44% )",
            }}
          >
            day
          </label>
          <input
            type="number"
            id="day"
            placeholder="DD"
            min={1}
            value={formData.day}
            style={{
              border: hasErrors
                ? "1px solid hsl(0, 100%, 67%)"
                : "1px solid hsl(0, 0%, 94% ) ",
            }}
            onChange={(e) =>
              setFormData((prevState) => ({
                ...prevState,
                day: e.target.value,
              }))
            }
          />
          {formErrors.day && <p className="error">{formErrors.day}</p>}
        </div>

        <div className="input-label-container">
          <label
            htmlFor="month"
            style={{
              color: hasErrors ? "hsl(0, 100%, 67%)" : "hsl(0, 1%, 44% )",
            }}
          >
            Month
          </label>
          <input
            type="number"
            id="month"
            placeholder="MM"
            min={1}
            value={formData.month}
            style={{
              border: hasErrors
                ? "1px solid hsl(0, 100%, 67%)"
                : "1px solid hsl(0, 0%, 94% ) ",
            }}
            onChange={(e) =>
              setFormData((prevState) => ({
                ...prevState,
                month: e.target.value,
              }))
            }
          />
          {formErrors.day && <p className="error">{formErrors.month}</p>}
        </div>

        <div className="input-label-container">
          <label
            htmlFor="year"
            style={{
              color: hasErrors ? "hsl(0, 100%, 67%)" : "hsl(0, 1%, 44% )",
            }}
          >
            Year
          </label>
          <input
            type="number"
            id="Year"
            placeholder="YYYY"
            min={1}
            value={formData.year}
            style={{
              border: hasErrors
                ? "1px solid hsl(0, 100%, 67%)"
                : "1px solid hsl(0, 0%, 94% ) ",
            }}
            onChange={(e) =>
              setFormData((prevState) => ({
                ...prevState,
                year: e.target.value,
              }))
            }
          />
          {formErrors.day && <p className="error">{formErrors.year}</p>}
        </div>
      </div>

      {formErrors.generic && (
        <p className=" error generic "> {formErrors.gene} </p>
      )}

      <div className="divider-container">
        <div className="divider"></div>
        <div
          className="btn"
          onClick={() =>
            handleSubmit(formData.day, formData.month, formData.year)
          }
        >
          <button>Calculate</button>
        </div>
      </div>

      <div className="output-container">
        <h1>
          <span className="highlighted">
            {output.years === "" ? "--" : output.years}
            {""}
          </span>
          {output.years === 1 ? "year" : "years"}
        </h1>
        <h1>
          <span className="highlighted">
            {output.months === "" ? "--" : output.months}
            {""}
          </span>
          {output.months === 1 ? "month" : "months"}
        </h1>
        <h1>
          <span className="highlighted">
            {output.days === "" ? "--" : output.days}
            {""}
          </span>
          {output.days === 1 ? "day" : "days"}
        </h1>
      </div>
    </div>
  );
};

export default App;
