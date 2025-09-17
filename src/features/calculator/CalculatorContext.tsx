import React, { createContext, useContext, useRef, useState } from "react";
import CalculatorService from "./CalculatorService";

interface CalculatorContextProps {
  service: CalculatorService;
  displayValue: string;
  setDisplayValue: (value: string) => void;
}

const CalculatorContext = createContext<CalculatorContextProps | undefined>(undefined);

export const useCalculatorContext = () => {
  const ctx = useContext(CalculatorContext);
  if (!ctx) throw new Error("CalculatorContext not found");
  return {  ...ctx, displayValue: ctx.displayValue };
};

export const CalculatorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [displayValue, setDisplayValue] = useState<string>("0");
  const serviceRef = useRef<CalculatorService | null>(null);
  
  if (!serviceRef.current) {
    serviceRef.current = new CalculatorService(setDisplayValue);
  }
  return (
    <CalculatorContext.Provider value={{ service: serviceRef.current, displayValue, setDisplayValue }}>
      {children}
    </CalculatorContext.Provider>
  );
};