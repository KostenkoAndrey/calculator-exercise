import React, { useState, useEffect } from "react";

import ButtonPanel from "./ButtonPanel";
import Display from "./Display";
import { withCalculatorProxy } from "./withCalculatorProxy";
import { useDisplayValue } from "./useDisplayValue";
import { displayValue } from "./types";

import "./index.css";
import "./App.css";


const Calculator: React.FC<{ proxiedService?: any }> = ({ proxiedService }) => {
  const [localDisplay, setLocalDisplay] = useState<string>("");
  const displayValue = useDisplayValue();

  useEffect(() => {
    setLocalDisplay(displayValue);
  }, [displayValue]);

  useEffect(() => {}, [localDisplay]);

    const buttons = [
    "AC", "+/-", "%", "÷",
    "7", "8", "9", "×",
    "4", "5", "6", "-",
    "1", "2", "3", "+",
    "", "0", ".", "="
  ];

  const handleButtonClick = (key: string) => {
    if (proxiedService) {
      proxiedService.handleKey(key);
    }
  };

  return (
    <div className="calculator-container">
      <Display value={localDisplay as displayValue} operand={0} />
      <ButtonPanel buttons={buttons} onButtonClick={handleButtonClick} />
    </div>
  );
};

export default withCalculatorProxy(Calculator);