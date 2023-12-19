import React, { useState } from 'react';
import './App.css';

export default function Calculator() {
  const [dataValue, setDataValue] = useState({
    numberValue: [],
    stringValue: '',
  });

  const handleClick = (value) => {
    setDataValue((prevData) => {
      let newValue;

      // Handle different types of input
      if (typeof value === 'number' || value === '.') {
        // If the input is a number or a decimal point, append it to the array
        newValue = [...prevData.numberValue, value];
      } else {
        // If the input is an operator or a special character, append it to the array
        const lastElement = prevData.numberValue.length > 0 ? prevData.numberValue[prevData.numberValue.length - 1] : null;
        newValue = lastElement === null || typeof lastElement === 'number' ? [...prevData.numberValue, value] : prevData.numberValue;
      }

      return {
        ...prevData,
        numberValue: newValue,
        stringValue: newValue.join(''),
      };
    });
  };

  const handleClearButton = () => {
    setDataValue({
      numberValue: [],
      stringValue: '',
    });
  };

  const handleEqualsButton = () => {
    let input = dataValue.numberValue;

    let operand1 = '';
    let operator = '';
    let operand2 = '';
    let result;

    input.forEach((element) => {
      if (typeof element === 'number' || element === '.') {
        if (operator === '') {
          operand1 += element;
        } else {
          operand2 += element;
        }
      } else {
        operator += element;
      }
    });

    operand1 = parseFloat(operand1);
    operand2 = parseFloat(operand2);

    switch (operator) {
      case '+':
        result = operand1 + operand2;
        break;
      case '-':
        result = operand1 - operand2;
        break;
      case 'x':
        result = operand1 * operand2;
        break;
      case '÷':
        // Check for division by zero
        result = operand2 !== 0 ? operand1 / operand2 : 'Error: Division by zero';
        break;
      default:
        // If no operator is present, return the last operand as the result
        result = operand1;
        break;
    }

    setDataValue({
      numberValue: [],
      stringValue: result.toString(),
    });
  };

  return (
    <div className="calculator-container">
      <div className="display">
        <label id="display">{dataValue.stringValue}</label>
      </div>

      <div className="button-grid">
        {[1, 2, 3, '+', 4, 5, 6, '-', 7, 8, 9, 'x', '.', 0, 'clr', '÷'].map((button, index) => (
          <button key={index} onClick={button==='clr' ? handleClearButton: () => handleClick(button)} className={button === 'clr' ? 'clear-button' : (typeof button === 'number' ? 'number-button' : 'operator-button')}>
            {button === 'clr' ? 'Clear' : button}
          </button>
        ))}
      </div>

      <div className="equals-button">
        <button onClick={handleEqualsButton}>=</button>
      </div>
    </div>
  );
}
