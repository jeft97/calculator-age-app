import { useState } from "react";
import InputFild from "./InputFild";

const fields = [
  {
    name: "day",
    label: "Day",
    value: "",
    placeholder: "DD",
    errorText: "Must be a valid day",
  },
  {
    name: "month",
    label: "Month",
    value: "",
    placeholder: "MM",
    errorText: "Must be a valid month",
  },
  {
    name: "year",
    label: "Year",
    value: "",
    placeholder: "YYYY",
    errorText: "Must be in the past",
  },
];

function isDateValid(year, month, day) {
  const currDate = new Date(`${year}-${month}-${day}`);
  return !isNaN(currDate.getTime());
}

export default function Header({ setBirthday }) {
  const [hasError, setHasError] = useState(false);

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
          {fields.map((input) => (
            <InputFild
              key={input.name}
              placeholder={input.placeholder}
              errorText={input.errorText}
              name={input.name}
              label={input.label}
              hasError={hasError}
            />
          ))}
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
