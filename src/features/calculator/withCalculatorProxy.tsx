import React from "react";
import { useCalculatorContext } from "./CalculatorContext";

export function withCalculatorProxy<P>(Component: React.ComponentType<P & { proxiedService: any }>) {
  
  return function Wrapped(props: P) {
    const { service } = useCalculatorContext();  
    // We need it for getting latest data in CalculatorContext
    return <Component {...props} proxiedService={service} />;
  };
}