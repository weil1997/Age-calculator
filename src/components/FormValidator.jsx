import React from "react";

function FormValidator({ day, month, year }) {
  const errors = [];

  if (!day || !month || !year) {
    errors.push("All fields are required");
  } else {
    const numericDay = parseInt(day);
    const numericMonth = parseInt(month);
    const numericYear = parseInt(year);

    if (numericDay < 1 || numericDay > 31) {
      errors.push("Day musy be between 1 and 31 ");
    }

    if (numericMonth < 1 || numericMonth > 12) {
      errors.push("Month must be between 1 and 12");
    }

    if (numericYear > new Date().getFullYear()) {
      errors.push("year cannot be in the future");
    }

    if (numericDay && numericMonth && numericYear) {
      const daysInMonth = new Date(numericYear, numericMonth, 0).getDate();
      if (numericDay > daysInMonth) {
        errors.push(` invalid date, ${daysInMonth} days in selected month `);
      }
    }
  }
}

return (
  <div className="error Message">
    {errors.map((error, index) => {
      <p key={index} className="error">
        {error}
      </p>;
    })}
  </div>
);

export default FormValidator;
