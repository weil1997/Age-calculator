import React, { useState } from "react";

function DateInput() {
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  return (
    <div className="container">
      <div className="input">
        <label>
          Day:
          <input
            type="text"
            placeholder="DD"
            value={day}
            onChange={(e) => setDay(e.target.value)}
          />
        </label>

        <label>
          Month:
          <input
            type="text"
            placeholder="MM"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
          />
        </label>

        <label>
          Year:
          <input
            type="text"
            placeholder="YYYY"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          />
        </label>
      </div>
    </div>
  );
}

export default DateInput;
