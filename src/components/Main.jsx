export default function Main({ bithday }) {
  const { elapsedYears, elapsedMonths, elapsedDays } = bithday;

  return (
    <div className="calculator__main">
      <div className="result">
        <strong>
          <span className="result--value">
            {elapsedYears ? elapsedYears.toString().padStart(2, 0) : "- -"}
          </span>
          years
        </strong>
        <strong>
          <span className="result--value">
            {elapsedMonths ? elapsedMonths.toString().padStart(2, 0) : "- -"}
          </span>
          months
        </strong>
        <strong>
          <span className="result--value">
            {elapsedDays ? elapsedDays.toString().padStart(2, 0) : "- -"}
          </span>
          days
        </strong>
      </div>
    </div>
  );
}
