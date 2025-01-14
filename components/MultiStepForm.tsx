"use client";

import { useState } from "react";
import StepOverview from "./StepOverview";
import StepDescriptions from "./StepDescriptions";
import StepPricing from "./StepPricing";
import StepConfirmation from "./StepConfirmation";

const MultiStepForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    catalogName: "",
    catalogDescription: "",
    productDetails: "",
    productPrice: "",
  });

  const nextStep = () => setCurrentStep((prev) => prev + 1);
  const prevStep = () => setCurrentStep((prev) => prev - 1);

  const handleInputChange = (e : any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    console.log("Submitted Data:", formData);
    alert("Form Submitted Successfully!");
  };

  switch (currentStep) {
    case 1:
      return (
        <StepOverview
          nextStep={nextStep}
          formData={formData}
          handleInputChange={handleInputChange}
        />
      );
    case 2:
      return (
        <StepDescriptions
          nextStep={nextStep}
          prevStep={prevStep}
          formData={formData}
          handleInputChange={handleInputChange}
        />
      );
    case 3:
      return (
        <StepPricing
          nextStep={nextStep}
          prevStep={prevStep}
          formData={formData}
          handleInputChange={handleInputChange}
        />
      );
    case 4:
      return (
        <StepConfirmation
          prevStep={prevStep}
          formData={formData}
          handleSubmit={handleSubmit}
        />
      );
    default:
      return <div>Invalid step</div>;
  }
};

export default MultiStepForm;
