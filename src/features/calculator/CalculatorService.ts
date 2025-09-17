import { CalculatorService as CalculatorServiceType } from "./types";

export default class CalculatorService implements CalculatorServiceType {
  private displayValue: string = "0";
  private expression = "";
  private firstOperand: number | null = null;
  private waitingForOperand = false;
  private operator: string | null = null;
  private callback:(v: string) => void;

  constructor(callback: (v: string) => void) {
    this.callback = callback;
  }

  private emit() {
    const full = this.expression || this.displayValue;
    this.callback(full);
  }

  // Handle digit or dot input
  public inputDigit(digit: string): void {
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

    const parts = this.expression.trim().split(" ").filter(Boolean);

    if (parts.length === 0) {
      this.expression = this.displayValue;
    } else if (!this.operator) {
      parts[0] = this.displayValue;
      this.expression = parts.join(" ");
    } else {
      const parts = this.expression.split(" ");
      if (parts.length === 2) {
        this.expression += ` ${digit}`;
      } else {
        parts[2] = this.displayValue;
        this.expression = parts.join(" ");
      }
    }
    this.emit();
  }

  // Handle operator input
  public inputOperator(nextOperator: string): void {
    const inputValue = parseFloat(this.displayValue);

    if (this.firstOperand === null) {
      this.firstOperand = inputValue;
      this.expression = this.displayValue;
    } else if (this.operator) {
      const result = this.performOperation(this.firstOperand, inputValue, this.operator);
      this.displayValue = String(result);
      this.firstOperand = result;
      this.expression = this.displayValue;
    }

    this.operator = nextOperator;
    this.expression = `${this.expression} ${nextOperator}`;
    this.waitingForOperand = true;
    this.emit();
  }

  // Perform calculation
  private performOperation(first: number, second: number, operator: string): number {
    switch (operator) {
      case "+": return first + second;
      case "-": return first - second;
      case "*": return first * second;
      case "/": return second !== 0 ? first / second : NaN;
      default: return second;
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
      this.expression = this.displayValue; 
      this.waitingForOperand = true;
      this.expression = "";
      this.emit();
    }
  }

    public toggleSign(): void {
  if (this.displayValue.startsWith("-")) {
    this.displayValue = this.displayValue.slice(1);
  } else if (this.displayValue !== "0") {
    this.displayValue = "-" + this.displayValue;
  }

  // если есть выражение — обновляем последний элемент
  if (this.expression) {
    const parts = this.expression.split(" ");
    parts[parts.length - 1] = this.displayValue;
    this.expression = parts.join(" ");
  } else {
    this.expression = this.displayValue;
  }
    this.emit();
  }

    public percent(): void {
    const current = parseFloat(this.displayValue || "0");

  if (this.firstOperand !== null && this.operator) {
    let percentValue = current / 100;

    switch (this.operator) {
      case "+":
      case "-":
        percentValue = (this.firstOperand * current) / 100;
        break;
      case "*":
        percentValue = current / 100;
        break;
      case "/":
        percentValue = current / 100;
        break;
    }

    this.displayValue = String(percentValue);
    this.expression = `${this.firstOperand} ${this.operator} ${current}%`;
  } else {
    const result = current / 100;
    this.displayValue = String(result);
    this.expression = this.displayValue;
  }
  this.emit();
  }

  // Clear all state
  public clear(): void {
    this.displayValue = "0";
    this.expression = "";
    this.firstOperand = null;
    this.operator = null;
    this.waitingForOperand = false;
    this.emit();
  }

  // Get current display value
  public getDisplayValue(): string {
    return this.expression || this.displayValue;
  }

  // Main handler for key input
  public handleKey = (raw: string): void => {
  const key = raw === "×" ? "*" : raw === '÷' ? "/" : raw; 

    if (/^[0-9]$/.test(key) || key === ".") {
      this.inputDigit(key);
    } else if (["+", "-", "*", "/"].includes(key)) {
      this.inputOperator(key);
    } else if (key === "=") {
      this.inputEquals();
    } else if (key === "AC") {
      this.clear();
    } else if (key === "+/-") {
      this.toggleSign();
    } else if (key === "%") {
      this.percent();
    }
  };
}
