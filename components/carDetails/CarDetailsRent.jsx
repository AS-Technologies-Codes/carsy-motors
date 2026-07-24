"use client";
import React, { useState } from 'react'
import CarReview from './RentReview';
import CarProtection from './CarProtection';

const CarDetailsRent = ({ carItem }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const STEPS = [
    { key: 0, label: "Car Selected" },
    { key: 1, label: "Car Review" },
    { key: 2, label: "Protection & Extras" },
    { key: 3, label: "Booking" },
  ];
  return (
    <>
      <div className="msf-progress flex justify-content-center py-5">
        {STEPS.map((step, index) => (
          <div
            key={step.key}
            className={`msf-progress-item ${index === currentStep - 1 ? "is-active" : ""
              } ${index < (currentStep - 1) ? "is-complete" : ""}`}
          >
            <span className="msf-progress-dot">
              {index < (currentStep - 1) ? "✓" : index + 1}
            </span>
            <span className="msf-progress-label">{step.label}</span>
          </div>
        ))}
      </div>
      {currentStep === 1 ?
        <CarReview carItem={carItem} setCurrentStep={setCurrentStep} />
        :
        currentStep === 2 ?
          <CarProtection />
          :
          null
      }
    </>
  )
}

export default CarDetailsRent