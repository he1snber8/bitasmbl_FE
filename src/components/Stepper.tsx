import { useEffect, useState } from "react";
import { Stepper, Step, Button } from "@material-tailwind/react"; // Adjust import

export default function DefaultStepper() {
  const [activeStep, setActiveStep] = useState(0);
  const steps = [0, 1, 2];

  useEffect(() => {
    const timer = setTimeout(() => {
      setActiveStep((prevStep) =>
        prevStep === steps.length - 1 ? 0 : prevStep + 1
      );
    }, 2000); // Delay of 2 seconds

    return () => clearTimeout(timer); // Cleanup to prevent memory leaks
  }, [activeStep]);

  return (
    <div className="w-1/2 py-4 px-8">
      <Stepper
        lineClassName="bg-red-600"
        activeLineClassName="bg-purple-700"
        activeStep={activeStep}
      >
        {steps.map((step, index) => (
          <Step key={index} onClick={() => setActiveStep(step)}>
            {step + 1}
          </Step>
        ))}
      </Stepper>
    </div>
  );
}
