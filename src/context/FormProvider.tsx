import { useState } from "react";
import type { FormData } from "../types/form";
import type { Rating } from "../types/rating";
import { FormContext } from "./FormContext";

const initialFormData: FormData = {
  orderNumber: "",
  email: "",
  date: "",
  shoppingMethod: "",
};

const initialRatings: Rating = {
  "product-quality": 0,
  "matches-description": 0,
  "durability": 0,
  "value-for-money": 0,
  "websites-ease-of-use": 0,
  "product-search": 0,
  "checkout-process": 0,
  "payment-options": 0,
  "delivery-experience": 0,
  "delivery-speed": 0,
  "packaging-quality": 0,
  "support-responsiveness": 0,
  "support-helpfulness": 0,
};

export const FormProvider = ({ children }: { children: React.ReactNode }) => {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [rating, setRatings] = useState<Rating>(initialRatings);
  const [currentStep, setCurrentStep] = useState(0);

  return (
    <FormContext.Provider
      value={{
        formData,
        rating,
        currentStep,
        setFormData,
        setRatings,
        nextStep: () => setCurrentStep((s) => s + 1),
        prevStep: () => setCurrentStep((s) => Math.max(0, s - 1)),
      }}
    >
      {children}
    </FormContext.Provider>
  );
};
