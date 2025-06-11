import React from 'react';
import './Stepper.css';

function Stepper({ steps, currentStep, onStepClick }) {
  return (
    <div className="stepper">
      {steps.map((_, index) => {
        const isActive = index <= currentStep;
        const isLastStep = index === steps.length - 1;
        return (
          <div
            key={index}
            className="step"
            onClick={() => {
              if (onStepClick && index <= currentStep) {
                onStepClick(index);
              }
            }}
            style={{ cursor: index <= currentStep ? 'pointer' : 'default' }}
          >
            <div className={`circle ${isActive ? 'active' : ''}`}>
              {isLastStep && isActive ? (
                <span className="checkmark">&#10003;</span> // Unicode checkmark
              ) : (
                index + 1
              )}
            </div>
            {index < steps.length - 1 && (
              <div className={`line ${index < currentStep ? 'active' : ''}`}></div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default Stepper;