/* eslint-disable react/prop-types */
import { useState } from "react";

export default function InputFild({
  placeholder,
  name,
  hasError,
  errorText,
  label,
}) {
  const [value, setValue] = useState(placeholder);

  return (
    <div className="input-box">
      <label htmlFor={label} className={`${hasError ? "active" : ""}`}>
        {label}
      </label>
      <input
        type="number"
        name={name}
        id={name}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        className={`${hasError ? "active" : ""}`}
      />
      <small className={`error ${hasError ? "error--active" : ""}`}>
        {errorText}
      </small>
    </div>
  );
}
