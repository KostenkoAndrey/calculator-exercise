import { useCalculatorContext } from "./CalculatorContext";

// returns string value for calculator's "display"
export function useDisplayValue() {
  const { displayValue } = useCalculatorContext();
  return displayValue;
}