export interface CalculatorService {
  handleKey?: (key: any) => void;
  getDisplayValue?: () => string;
}
export type displayValue = string & { __brand: "displayValue" };
