import { useState } from "react";
import "./App.css";
import { monthsAndDays } from "./Constants.jsx";
import isLeapYear from "./Functions.jsx";

import React from "react";

const App = () => {
  // State för att hålla reda på formulärdata, som dag, månad och år
  const [formData, setFormData] = useState({
    day: "",
    month: "",
    year: "",
  });

  // State för att hantera eventuella fel som uppstår i formuläret
  const [formErrors, setFormErrors] = useState({
    day: "",
    month: "",
    year: "",
    generic: "",
  });

  // State för att lagra resultatet av datumdifferensberäkningar
  const [output, setOutput] = useState({
    days: "",
    months: "",
    years: "",
  });

  // Kontrollerar om några fel finns i formuläret baserat på formErrors
  const hasErrors =
    formErrors.day || formErrors.month || formErrors.year || formErrors.generic;

  const dateDiff = (date) => {
    // Dela upp datumsträngen i år, månad och dag
    date = date.split("-");

    // Skapa ett datumobjekt för dagens datum
    const today = new Date();

    // Extrahera aktuellt år, månad och dag från dagens datum
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const day = today.getDate();

    // Extrahera år, månad och dag från det angivna datumet
    const yy = parseInt(date[0]);
    const mm = parseInt(date[1]);
    const dd = parseInt(date[2]);

    let years, months, days;

    // Beräkna antal månader skillnad genom att subtrahera månaden i angivet datum från aktuell månad
    months = month - mm;

    // Om dagen i angivet datum är större än aktuell dag, minska antal månader
    if (day < dd) {
      months = months - 1;
    }

    // Beräkna antal år skillnad genom att subtrahera året i angivet datum från aktuellt år
    years = year - yy;

    // Om angiven månad och dag är framtida jämfört med aktuell månad och dag, justera år och månader
    if (month * 100 - day < mm * 100 + dd) {
      years = years - 1;
      months = months + 12;
    }

    // Beräkna antal dagar skillnad genom att använda tidsskillnaden mellan dagens datum och angivet datum
    days = Math.floor(
      (today.getTime() - new Date(yy + years, mm + months - 1, dd).getTime()) /
        (24 * 60 * 60 * 1000)
    );

    // Returnera ett objekt med antal år, månader och dagar i differensen
    return { years: years, months: months, days: days };
  };

  const handleSubmit = (day, month, year) => {
    // Konvertera dag, månad och år till heltal
    const dayAsNumber = parseInt(day);
    const monthAsNumber = parseInt(month);
    const yearAsNumber = parseInt(year);

    // Skapa ett datumobjekt för dagens datum med tiden nollställd
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let chosenDate;
    if (formData.year && formData.month && formData.day) {
      // Skapa ett datumobjekt för det valda datumet (från formuläret)
      chosenDate = new Date(formData.year, formData.month - 1, formData.day);
    }

    // Antal dagar i varje månad (0-indexerad)
    const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    // Hitta den aktuella månadens information från 'monthsAndDays'
    const currentMonth = monthsAndDays.find(
      (item) => item.month === monthAsNumber
    );

    // Funktion för att validera antalet dagar för februari beroende på skottår
    const validateDaysForFebruary = () => {
      if (monthAsNumber === 2) {
        let maxDays;
        if (isLeapYear(yearAsNumber)) {
          maxDays = currentMonth?.days?.leap;
        } else {
          maxDays = currentMonth?.days?.common;
        }

        if (dayAsNumber < maxDays) {
          return true;
        } else {
          return false;
        }
      }
      return false;
    };

    // Validera om dagen är giltig för den angivna månaden
    const isDayInputValid =
      dayAsNumber >= 1 && dayAsNumber <= daysInMonth[monthAsNumber - 1];

    // Validera om månaden är inom intervallet 1 till 12
    const isMonthInputValid = monthAsNumber >= 1 && monthAsNumber <= 12;

    // Validera om året är ett giltigt år (större än eller lika med 1 och mindre än aktuellt år)
    const isYearInputValid =
      yearAsNumber >= 1 && yearAsNumber < today.getFullYear();

    // Validera om det angivna datumet är ett förflutet datum jämfört med dagens datum
    const isPastDate = chosenDate < today;

    // Validera och hantera felmeddelanden beroende på om någon av fälten är tomma
    if (!day) {
      setFormErrors((prevState) => ({
        ...prevState,
        day: "This field is required",
        month: formErrors.month && isMonthInputValid ? "" : prevState.month,
        year: formErrors.year && isYearInputValid ? "" : prevState.year,
      }));
    }
    if (!month) {
      setFormErrors((prevState) => ({
        ...prevState,
        day: formErrors.day && isDayInputValid ? "" : prevState.day,
        month: "This field is required",
        year: formErrors.year && isDayInputValid ? "" : prevState.year,
      }));
    }
    if (!year) {
      setFormErrors((prevState) => ({
        ...prevState,
        day: formErrors.day && isDayInputValid ? "" : prevState.day,
        month: formErrors.month && isMonthInputValid ? "" : prevState.month,
        year: "This field is required",
      }));
    }

    // Kontrollera om alla pre-checks (för giltiga dagar, månader och år) är uppfyllda
    const isPrecheckValid =
      isDayInputValid && isMonthInputValid && isYearInputValid;

    // Om någon av pre-checks inte är uppfyllda, sätta felmeddelanden för respektive ogiltig input
    if (!isPrecheckValid) {
      if (day && !isDayInputValid) {
        setFormErrors((prevState) => ({
          ...prevState,
          day: "Must be a valid day",
          month: formErrors.month && isMonthInputValid ? "" : prevState.month,
          year: formErrors.year && isYearInputValid ? "" : prevState.year,
          generic: "",
        }));
      }

      if (month && !isMonthInputValid) {
        setFormErrors((prevState) => ({
          ...prevState,
          day: formErrors.day && isMonthInputValid ? "" : prevState.day,
          month: "Must be a valid month",
          year: formErrors.year && isMonthInputValid ? "" : prevState.year,
          generic: "",
        }));
      }
      if (year && !isYearInputValid) {
        setFormErrors((prevState) => ({
          ...prevState,
          day: formErrors.day && isMonthInputValid ? "" : prevState.day,
          month: formErrors.month && isMonthInputValid ? "" : prevState.month,
          year: "Must be a valid year",
          generic: "",
        }));
      }
    }
    // Om pre-checks är uppfyllda och angivet datum är i förflutet, sätt ett generiskt felmeddelande
    else if (!isPrecheckValid && !isPastDate) {
      setFormErrors(() => ({
        day: "",
        month: "",
        year: "",
        generic: "Must be a date in the past",
      }));
    }
    // Om varken pre-checks misslyckades eller det är en framtidig dag, rensa eventuella felmeddelanden
    else {
      if (hasErrors) {
        setFormErrors({
          day: "",
          month: "",
          year: "",
          generic: "",
        });
      }

      // Skapa en formaterad datumsträng med formatet "YYYY-MM-DD"
      const formattedDate = `${year}-${month}-${day}`;

      // Anropa funktionen dateDiff med den formaterade datumsträngen och få differensen i år, månader och dagar
      const { years, months, days } = dateDiff(formattedDate);

      // Uppdatera output-tillståndet med resultaten från differensberäkningen
      setOutput({
        days: days,
        months: months,
        years: years,
      });
    }
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
          {formErrors.month && <p className="error">{formErrors.month}</p>}
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
          {formErrors.year && <p className="error">{formErrors.year}</p>}
        </div>
      </div>

      {formErrors.generic && (
        <p className="error generic">{formErrors.generic}</p>
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
