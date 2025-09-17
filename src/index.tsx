import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import Calculator from "./App";
import { CalculatorProvider } from "./features/calculator/CalculatorContext";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <CalculatorProvider>
      <Calculator />
    </CalculatorProvider>
  </React.StrictMode>
);