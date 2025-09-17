import React, { MouseEventHandler } from "react";

interface ButtonProps {
  value: string;
  onClick: MouseEventHandler<HTMLButtonElement>
}

const Button: React.FC<ButtonProps> = ({ value, onClick }) => {
  const safeValue = value
    .replace("+/-", "PM")  
    .replace("+", "plus")
    .replace("-", "minus")
    .replace("×", "mul")
    .replace("÷", "div")
    .replace("=", "eq")
    .replace(".", "dot")
    .replace("AC", "clear")
    .replace("%", "percent");

  return (
  <button
    className={`calc-btn calc-btn-${safeValue}`}
    onClick={onClick}
  >
    {value}
  </button>)
  };

export default Button;