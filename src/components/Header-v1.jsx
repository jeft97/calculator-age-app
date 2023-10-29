import { useEffect, useRef, useState } from "react";

function isDateValid(year, month, day) {
  const currDate = new Date(`${year}-${month}-${day}`);
  return !isNaN(currDate.getTime());
}

// eslint-disable-next-line react/prop-types
export default function Header({ setBirthday }) {
  const [hasError, setHasError] = useState(false);

  const [day, setDay] = useState("DD");
  const [month, setMonth] = useState("MM");
  const [year, setYear] = useState("YYYY");

  const inputDay = useRef();

  useEffect(function () {
    inputDay.current.focus();
  }, []);

  function handleSubmit(e) {
    setHasError(false);

    e.preventDefault();

    const formDate = Object.fromEntries(new FormData(e.currentTarget));

    const day = +formDate.day;
    const month = +formDate.month;
    const year = +formDate.year;

    const currDate = new Date();
    const inputDate = new Date(`${year}-${month}-${day}`);
    const timeDiff = currDate - inputDate;

    if (year > currDate.getFullYear()) {
      setHasError(true);
      return;
    }

    if (
      year === +currDate.getFullYear() &&
      (month > +currDate.getMonth() + 1 ||
        (month === +currDate.getMonth() + 1 && day > currDate.getDate()))
    ) {
      setHasError(true);
      return;
    }

    if (!isDateValid(year, month, day)) {
      setHasError(true);
      return;
    }

    // 1s=1000ms;1min=60;1h= 60min;1dia = 24h;1ano = 365 dias
    const elapsedYears = Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 365));

    // 1s=1000ms;1min=60;1h= 60min;1dia = 24h;1mes = 30 dias
    const elapsedMonths = Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 30));

    // 1s=1000ms;1min=60;1h= 60min;1dia = 24h
    const elapsedDays = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

    setBirthday({
      elapsedYears,
      elapsedMonths,
      elapsedDays,
    });
  }

  return (
    <div className="calculator__header">
      <form action="#" onSubmit={handleSubmit}>
        <div className="box-form">
          <div className="input-box">
            <label htmlFor="day" className={`${hasError ? "active" : ""}`}>
              Day
            </label>
            <input
              ref={inputDay}
              type="number"
              name="day"
              id="day"
              placeholder="DD"
              value={day}
              onChange={(e) => setDay(e.target.value)}
              className={`${hasError ? "active" : ""}`}
            />
            <small className={`error ${hasError ? "error--active" : ""}`}>
              Must be a valid day
            </small>
          </div>
          <div className="input-box">
            <label htmlFor="month" className={`${hasError ? "active" : ""}`}>
              Month
            </label>
            <input
              type="number"
              name="month"
              id="month"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              placeholder="MM"
              className={`${hasError ? "active" : ""}`}
            />
            <small className={`error ${hasError ? "error--active" : ""}`}>
              Must be a valid month
            </small>
          </div>
          <div className="input-box">
            <label htmlFor="year" className={`${hasError ? "active" : ""}`}>
              Year
            </label>
            <input
              type="number"
              name="year"
              id="year"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              placeholder="YYYY"
              className={`${hasError ? "active" : ""}`}
            />
            <small className={`error ${hasError ? "error--active" : ""}`}>
              Must be in the past
            </small>
          </div>
        </div>

        <div className="controll">
          <hr />
          <button className="btn">
            <img src="./images/icon-arrow.svg" alt="icon arrow" />
          </button>
        </div>
      </form>
    </div>
  );
}
