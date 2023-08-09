import React, { useState } from "react";
import FormValidator from "./components/FormValidator";

function AgeCalculator() {
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [errorMessages, setErrorMessages] = useState([]);

  const calculateAge = () => {
    const today = new Date();
    const birthDate = new Date(year, month - 1, day);
    const ageInMilliseconds = today - birthDate;

    const years = Math.floor(ageInMilliseconds / (365 * 24 * 60 * 60 * 1000));
    const months =
      Math.floor(ageInMilliseconds % (365 * 24 * 60 * 1000)) /
      (30 * 24 * 60 * 60 * 1000);
    const days = Math.floor(
      ((ageInMilliseconds % (365 * 24 * 60 * 60 * 1000)) %
        (30 * 24 * 60 * 60 * 1000)) /
        (24 * 60 * 60 * 1000)
    );

    return { years, months, days };
  };

  const age = calculateAge();

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
      <div className="result">
        {age.years > 0 && <p>Years: {age.years}</p>}
        {age.months > 0 && <p>Months: {age.months}</p>}
        {age.daýs > 0 && <p>Days: {age.days}</p>}
      </div>
    </div>
  );
}

export default AgeCalculator;
