import React from "react";

import ButtonPanel from "./components/ButtonPanel";
import Display from "./components/Display";
import { withCalculatorProxy } from "./features/calculator/withCalculatorProxy";
import { useDisplayValue } from "./hooks/useDisplayValue";
import type { displayValue as DisplayValue } from "./types/types";

import "./styles/index.css";
import "./styles/App.css";


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
      <Display value={display as DisplayValue} />
      <ButtonPanel buttons={buttons} onButtonClick={handleButtonClick} />
    </div>
  );
};

export default withCalculatorProxy(Calculator);