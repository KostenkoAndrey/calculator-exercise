import React from "react";

import ButtonPanel from "./ButtonPanel";
import Display from "./Display";
import { withCalculatorProxy } from "./withCalculatorProxy";
import { useDisplayValue } from "./useDisplayValue";
import type { displayValue as DisplayValue } from "./types";

import "./index.css";
import "./App.css";


const Calculator: React.FC<{ proxiedService?: any }> = ({ proxiedService }) => {
  const display = useDisplayValue();

    const buttons = [
    "AC", "+/-", "%", "÷",
    "7", "8", "9", "×",
    "4", "5", "6", "-",
    "1", "2", "3", "+",
    "", "0", ".", "="
  ];

  const handleButtonClick = (key: string) => {
  proxiedService?.handleKey(key);
  };

  return (
    <div className="calculator-container">
      <Display value={display as DisplayValue} operand={0} />
      <ButtonPanel buttons={buttons} onButtonClick={handleButtonClick} />
    </div>
  );
};

export default withCalculatorProxy(Calculator);