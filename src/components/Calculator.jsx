import { useState } from "react";
import Header from "./Header";
import Main from "./Main";

export default function Calculator() {
  const [bithday, setBirthday] = useState({});
  return (
    <div className="calculator">
      <Header setBirthday={setBirthday} />
      <Main bithday={bithday} />
    </div>
  );
}
