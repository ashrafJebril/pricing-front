import React, { useEffect, useState } from "react";
import ChooseProduct from "../../components/pricing/ChooseProduct";
// import ModifyProduct from "../components/pricing/ModifyPrice";
// import SelectCustomerNadDiscount from "../components/pricing/SelecteCustomerAndDiscound";
// import CheckQuote from "../components/pricing/CheckQuote";
import { useSelector } from "react-redux";

const PricingSteps = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const quotes = useSelector((state: any) => state.quotesStore.quotes.products);
  const steps = [
    { id: 1, label: "Step 1" },
    { id: 2, label: "Step 2" },
    { id: 3, label: "Step 3" },
    { id: 4, label: "Step 4" },
  ];

  // useEffect(() => {
  //   console.log("quotes", quotes);
  // }, [quotes]);

  return (
    <div className="mx-auto mt-8 ">
      {/* Steps with horizontal lines */}
      <div className="flex flex-col items-center">
        <div className="flex items-center justify-center space-x-4 relative">
          {steps.map((step, index) => (
            <React.Fragment key={step.id}>
              {/* Step */}
              <div className="flex flex-col items-center">
                <div
                  onClick={() => setCurrentStep(step.id)}
                  className={`relative flex px-3 items-center justify-center w-12 h-12 border-2 rounded-full cursor-pointer transition-colors ${
                    currentStep >= step.id
                      ? "bg-blue-500 border-blue-500 text-white"
                      : "bg-gray-100 border-gray-300 text-gray-600"
                  }`}
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
        <div className="flex !bg-blue-500 h-16 w-64 gap-x-6 mt-4">
          <button
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded disabled:opacity-50"
            onClick={() => setCurrentStep((prev) => Math.max(prev - 1, 1))}
            disabled={currentStep === 1}
          >
            Back
          </button>
          <button
            style={{
              padding: "8px 16px", // Equivalent to px-4 py-2
              borderRadius: "8px", // Equivalent to rounded
              color: "white", // Default text color
              backgroundColor:
                currentStep === steps.length || quotes.length === 0
                  ? "#d1d5db"
                  : "#3b82f6", // Grey if disabled, blue if enabled
              cursor:
                currentStep === steps.length || quotes.length === 0
                  ? "not-allowed"
                  : "pointer", // Disabled cursor if not allowed
              opacity:
                currentStep === steps.length || quotes.length === 0 ? 0.5 : 1, // Disabled opacity
            }}
            onClick={() =>
              setCurrentStep((prev) => Math.min(prev + 1, steps.length))
            }
            disabled={currentStep === steps.length || quotes.length === 0}
          >
            Next
          </button>
        </div>
      </div>

      {/* Step Content */}

      {currentStep === 1 && <ChooseProduct />}
      {currentStep === 2 && <div>asghas</div>}
      {currentStep === 3 && <div>23523</div>}
      {currentStep === 4 && <div>asghas</div>}
      {/* Navigation Buttons */}
    </div>
  );
};

export default PricingSteps;
