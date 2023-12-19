import React, { useState } from 'react';
import './App.css';
import { evaluate } from 'mathjs';  // Import the 'evaluate' function directly

export default function Calculator() {
  const [dataValue, setDataValue] = useState({
    numberValue: [],
    stringValue: '',
  });

  const handleClick = (value) => {
    setDataValue((prevData) => {
      let newValue;

      if (value === 'clr') {
        // Clear button pressed
        return {
          numberValue: [],
          stringValue: '',
        };
      }

      // Handle different types of input
      if (typeof value === 'number' || value === '.') {
        // If the input is a number or a decimal point, append it to the array
        newValue = [...prevData.numberValue, value];
      } else {
        // If the input is an operator, handle the previous operator and operands
        const lastElement = prevData.numberValue.length > 0 ? prevData.numberValue[prevData.numberValue.length - 1] : null;

        if (lastElement === null || typeof lastElement === 'number') {
          newValue = [...prevData.numberValue, value];
        } else {
          // Replace the last operator with the new one
          const updatedValue = [...prevData.numberValue.slice(0, -1), value];
          newValue = updatedValue;
        }
      }

      return {
        ...prevData,
        numberValue: newValue,
        stringValue: newValue.join(''),
      };
    });
  };

  const handleClearButton = () => {
    // Clear button pressed
    setDataValue({
      numberValue: [],
      stringValue: '',
    });
  };

  const handleEqualsButton = () => {
    try {
      const result = evaluate(dataValue.stringValue);  // Use the 'evaluate' function
      setDataValue({
        numberValue: [result],
        stringValue: result.toString(),
      });
    } catch (error) {
      setDataValue({
        numberValue: [],
        stringValue: 'Error',
      });
    }
  };

  return (
    <div className="calculator-container">
      <div className="display">
        <label id="display">{dataValue.stringValue}</label>
      </div>

      <div className="button-grid">
        {[1, 2, 3, '+', 4, 5, 6, '-', 7, 8, 9, '*', '.', 0, 'clr', '/'].map((button, index) => (
          <button key={index} onClick={() => handleClick(button)} className={button === 'clr' ? 'clear-button' : (typeof button === 'number' ? 'number-button' : 'operator-button')}>
            {button === 'clr' ? 'C' : button}
          </button>
        ))}
      </div>

      <div className="equals-button">
        <button onClick={handleEqualsButton}>=</button>
      </div>
    </div>
  );
}
