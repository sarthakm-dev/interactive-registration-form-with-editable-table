import type { FormData } from "../types/form";
import type { Rating } from "./rating";

export type FormContextType = {
  formData: FormData;
  rating: Rating;
  currentStep: number;

  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  setRatings: React.Dispatch<React.SetStateAction<Rating>>;

  nextStep: () => void;
  prevStep: () => void;
};