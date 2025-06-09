import React from 'react';
import './Stepper.css';

function Stepper({ steps, currentStep }) {
  return (
    <div className="stepper">
      {steps.map((_, index) => (
        <div className="step" key={index}>
          <div className={`circle ${index <= currentStep ? 'active' : ''}`}>
            {index + 1}
          </div>
          {index < steps.length - 1 && (
            <div className={`line ${index < currentStep ? 'active' : ''}`}></div>
          )}
        </div>
      ))}
    </div>
  );
}

export default Stepper;
