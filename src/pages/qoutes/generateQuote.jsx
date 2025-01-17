import React, { useState, useEffect } from "react";
import ChooseProduct from "../../components/pricing/ChooseProduct";
import EditPrice from "../../components/pricing/EditPrice";
import SelectCustomerAndDiscount from "../../components/pricing/SelectCustomerAndDiscount";
import QuotePreview from "../../components/pricing/QuotePreview";
import { useSelector } from "react-redux";

const PricingSteps = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const quotes = useSelector((state) => state.quotesStore.quotes.products);
  const customer = useSelector((state) => state.quotesStore.quotes.customer);

  const steps = [
    { id: 1, label: "Step 1" },
    { id: 2, label: "Step 2" },
    { id: 3, label: "Step 3" },
    { id: 4, label: "Step 4" },
  ];
  useEffect(() => {
    console.log("quotesquotes", quotes);
  }, [quotes]);

  const handleStepChange = (stepId) => {
    if (stepId === 2 && quotes.length === 0) {
      alert("You must add at least one quote to proceed to Step 2.");
      return;
    }
    if (stepId === 3 && quotes.length === 0) {
      alert("You must add at least one quote to proceed to Step 3.");
      return;
    }
    if (
      stepId === 4 &&
      (quotes.length === 0 || !customer || Object.keys(customer).length === 0)
    ) {
      alert("You must have quotes and select a customer to proceed to Step 4.");
      return;
    }
    setCurrentStep(stepId);
  };

  return (
    <div className="mt-8">
      {/* Steps with horizontal lines */}
      <div className="flex flex-col items-center">
        <div className="flex gap-x-6 items-center">
          {/* Back Button */}
          <button
            className="h-8 w-24 bg-gray-300 text-gray-700 rounded disabled:opacity-50"
            onClick={() => setCurrentStep((prev) => Math.max(prev - 1, 1))}
            disabled={currentStep === 1}
          >
            Back
          </button>

          {/* Steps Navigation */}
          <div className="flex items-center justify-center space-x-4 relative">
            {steps.map((step, index) => (
              <React.Fragment key={step.id}>
                <div className="flex flex-col items-center">
                  <div
                    onClick={() => handleStepChange(step.id)}
                    className={`relative flex items-center justify-center w-12 h-12 border-2 rounded-full cursor-pointer transition-colors ${
                      currentStep >= step.id
                        ? "bg-blue-500 border-blue-500 text-white"
                        : "bg-gray-100 border-gray-300 text-gray-600"
                    } ${
                      (quotes && step.id === 2 && quotes.length === 0) ||
                      (quotes && step.id === 3 && quotes.length === 0) ||
                      (step.id === 4 &&
                        ((quotes && quotes.length === 0) ||
                          !customer ||
                          Object.keys(customer).length === 0))
                        ? "cursor-not-allowed opacity-50"
                        : ""
                    }`}
                    style={{
                      pointerEvents:
                        (step.id === 2 && quotes && quotes.length === 0) ||
                        (step.id === 3 && quotes && quotes.length === 0) ||
                        (step.id === 4 &&
                          ((quotes && quotes.length === 0) ||
                            !customer ||
                            Object.keys(customer).length === 0))
                          ? "none"
                          : "auto",
                    }}
                  >
                    {step.id}
                  </div>
                  <p
                    className={`mt-2 text-center text-sm font-medium ${
                      currentStep >= step.id ? "text-blue-500" : "text-gray-600"
                    }`}
                  >
                    {step.label}
                  </p>
                </div>
                {/* Curved Path Between Steps */}
                {index < steps.length - 1 && (
                  <svg
                    className="w-16 h-6"
                    viewBox="0 0 100 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0 10 C30 0, 70 0, 100 10"
                      stroke={currentStep > step.id ? "#3b82f6" : "#d1d5db"}
                      strokeWidth="2"
                      fill="transparent"
                    />
                  </svg>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Next Button */}
          <button
            className="h-8 w-24"
            style={{
              borderRadius: "8px",
              color: "white",
              backgroundColor:
                currentStep === steps.length ||
                (currentStep === 1 && quotes.length === 0) ||
                (currentStep === 2 && quotes.length === 0) ||
                (currentStep === 3 &&
                  (quotes.length === 0 ||
                    !customer ||
                    Object.keys(customer).length === 0))
                  ? "#d1d5db"
                  : "#3b82f6",
              cursor:
                currentStep === steps.length ||
                (currentStep === 1 && quotes.length === 0) ||
                (currentStep === 2 && quotes.length === 0) ||
                (currentStep === 3 &&
                  (quotes.length === 0 ||
                    !customer ||
                    Object.keys(customer).length === 0))
                  ? "not-allowed"
                  : "pointer",
              opacity:
                currentStep === steps.length ||
                (currentStep === 1 && quotes.length === 0) ||
                (currentStep === 2 && quotes.length === 0) ||
                (currentStep === 3 &&
                  (quotes.length === 0 ||
                    !customer ||
                    Object.keys(customer).length === 0))
                  ? 0.5
                  : 1,
            }}
            onClick={() =>
              setCurrentStep((prev) => Math.min(prev + 1, steps.length))
            }
            disabled={
              currentStep === steps.length ||
              (currentStep === 1 && quotes.length === 0) ||
              (currentStep === 2 && quotes.length === 0) ||
              (currentStep === 3 &&
                (quotes.length === 0 ||
                  !customer ||
                  Object.keys(customer).length === 0))
            }
          >
            Next
          </button>
        </div>
      </div>

      {/* Step Content */}
      {currentStep === 1 && <ChooseProduct />}
      {currentStep === 2 && <EditPrice />}
      {currentStep === 3 && <SelectCustomerAndDiscount />}
      {currentStep === 4 && <QuotePreview />}
    </div>
  );
};

export default PricingSteps;
