import React, { useState } from "react";
import Button from "../Button/Button";
import "./Calculator.css";
const Calculator = () => {
  const [current, setCurrent] = useState("");
  const [result, setResult] = useState("");
  const handleClick = (value, type) => {
    const operators = ["+", "-", "*", "/"];
    if (type === "operand") {
      //   Checking for initial zero
      if (value === "0" && current.length === 0) return;
      let operator = Number(result[result.length - 1]);
      // Setting value
      isNaN(operator) && setCurrent((curr) => curr + value);
    } else if (type === "others") {
      if (value === ".") {
        let res = current.includes(".");
        !res && setCurrent((curr) => curr + value);
      } else if (value === "AC") {
        setCurrent("");
        setResult("");
      } else if (value === "DEL") {
        setCurrent((curr) => curr.slice(0, curr.length - 1));
      } else {
        const result = performOperation();
        if (result === null) return;
        setResult(result.toString());
        setCurrent("");
      }
    } else {
      const isOperatorPresent = operators.some(
        (operator) => result[result.length - 1] === operator
      );
      if (isOperatorPresent) return;
      if (current.length) {
        // Performing mathematical operations on expressions
        const result = performOperation();
        if (result === null) {
          setResult(current + value);
          setCurrent("");
          return;
        }
        setResult(result.toString() + value);
        setCurrent("");
      } else if (result.length) {
        setResult(result + value);
      }
    }
  };

  const performOperation = () => {
    const leftOperand = Number(current);
    const rightOperand = Number(result.slice(0, result.length - 1));
    let operator = result[result.length - 1];

    if (operator === "+") {
      return leftOperand + rightOperand;
    } else if (operator === "-") {
      return rightOperand - leftOperand;
    } else if (operator === "*") {
      return leftOperand * rightOperand;
    } else if (operator === "/") {
      return rightOperand / leftOperand;
    } else return null;
  };

  return (
    <div className="Calculator">
      <div className="textfield">
        <input type="text" disabled className="result" value={result} />
        <input type="text" disabled className="current" value={current} />
      </div>
      <div className="buttonsfield">
        <div>
          <Button value="AC" type="others" handleclick={handleClick} />
          <Button value="DEL" type="others" handleclick={handleClick} />
          <Button value="/" type="operator" handleclick={handleClick} />
        </div>
        <div>
          <Button value="1" type="operand" handleclick={handleClick} />
          <Button value="2" type="operand" handleclick={handleClick} />
          <Button value="3" type="operand" handleclick={handleClick} />
          <Button value="*" type="operator" handleclick={handleClick} />
        </div>
        <div>
          <Button value="4" type="operand" handleclick={handleClick} />
          <Button value="5" type="operand" handleclick={handleClick} />
          <Button value="6" type="operand" handleclick={handleClick} />
          <Button value="+" type="operator" handleclick={handleClick} />
        </div>
        <div>
          <Button value="7" type="operand" handleclick={handleClick} />
          <Button value="8" type="operand" handleclick={handleClick} />
          <Button value="9" type="operand" handleclick={handleClick} />
          <Button value="-" type="operator" handleclick={handleClick} />
        </div>
        <div>
          <Button value="." type="others" handleclick={handleClick} />
          <Button value="0" type="operand" handleclick={handleClick} />
          <Button value="=" type="others" handleclick={handleClick} />
        </div>
      </div>
    </div>
  );
};

export default Calculator;
