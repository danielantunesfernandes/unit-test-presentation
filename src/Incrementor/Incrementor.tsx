import React, { useState } from "react";
import useCalc from "../hooks/useCalc";
function Incrementor(): JSX.Element {
  const [numberValue, setNumberValue] = useState(0);
  const { calcPowerTwo } = useCalc();

  const incrementValue = () => {
    const result = numberValue + 1;
    setNumberValue(result);
  };

  const calcPowerTwoValue = () => {
    const result: number = calcPowerTwo(numberValue);
    setNumberValue(result);
  };

  return (
    <div>
      <h1>Incrementor</h1>
      Value: <span data-testid="result">{numberValue}</span>
      <br />
      <button onClick={incrementValue}>Increment</button>
      <button onClick={calcPowerTwoValue}>Power of two</button>
    </div>
  );
}

export default Incrementor;
