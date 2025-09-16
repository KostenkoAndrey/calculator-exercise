import { CalculatorService as CalculatorServiceType } from "./types";

export default class CalculatorService implements CalculatorServiceType {
  private displayValue: string = "0";
  private firstOperand: number | null = null;
  private waitingForOperand: boolean = false;
  private operator: string | null = null;
  private callback: any;

  constructor(callback: any) {
    this.callback = callback;
  }

  // Handle digit or dot input
  public inputDigit(digit: any): void {
    if (this.waitingForOperand) {
      this.displayValue = digit === "." ? "0." : digit;
      this.waitingForOperand = false;
    } else {
      if (digit === "." && this.displayValue.includes(".")) return;
      this.displayValue =
        this.displayValue === "0" && digit !== "."
          ? digit
          : this.displayValue + digit;
    }
    this.callback(this.displayValue);
  }

  // Handle operator input
  public inputOperator(nextOperator: any): void {
    const inputValue = parseFloat(this.displayValue);
    if (this.firstOperand === null) {
      this.firstOperand = inputValue;
    } else if (this.operator) {
      const result = this.performOperation(this.firstOperand, inputValue, this.operator);
      this.displayValue = String(result);
      this.firstOperand = result;
      this.callback(this.displayValue);
    }
    this.operator = nextOperator;
    this.waitingForOperand = true;
  }

  // Perform calculation
  private performOperation(first: number, second: number, operator: string): number {
    switch (operator) {
      case "+":
        return first + second;
      case "-":
        return first - second;
      case "*":
        return first * second;
      case "/":
        return second !== 0 ? first / second : NaN;
      default:
        return second;
    }
  }

  // Handle equals
  public inputEquals(): void {
    if (this.operator && this.firstOperand !== null) {
      const inputValue = parseFloat(this.displayValue);
      const result = this.performOperation(this.firstOperand, inputValue, this.operator);
      this.displayValue = String(result);
      this.firstOperand = null;
      this.operator = null;
      this.waitingForOperand = false;
      this.callback(this.displayValue);
    }
  }

  // Clear all state
  public clear(): void {
    this.displayValue = "0";
    this.firstOperand = null;
    this.operator = null;
    this.waitingForOperand = false;
    this.callback(this.displayValue);
  }

  // Get current display value
  public getDisplayValue(): string {
    return this.displayValue;
  }

  // Main handler for key input
  public handleKey = (key: any): void => {
    if (/^[0-9]$/.test(key) || key === ".") {
      this.inputDigit(key);
    } else if (["+", "-", "*", "/"].includes(key)) {
      this.inputOperator(key);
    } else if (key === "=") {
      this.inputEquals();
    } else if (key === "AC") {
      this.clear();
    }
  }
}
