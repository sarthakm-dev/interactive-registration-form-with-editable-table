import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

type FormState = {
  formData: Record<string, any>;
  rating: Record<string, number>;
  errors: Record<string, string>;
  currentStep: number;

  setField: (name: string, value: any) => void;
  setRating: (category: string, value: number) => void;
  setErrors: (errors: Record<string, string>) => void;
  clearError: (name: string) => void;

  nextStep: () => void;
  prevStep: () => void;
  resetForm: () => void;
};

export const useFormStore = create<FormState>()(
  immer((set) => ({
    formData: {},
    rating: {},
    errors: {},
    currentStep: 0,

    setField: (name, value) =>
      set((state) => {
        state.formData[name] = value;
        delete state.errors[name];
      }),

    setRating: (category, value) =>
      set((state) => {
        state.rating[category] = value;
        delete state.errors[category];
      }),

    setErrors: (errors) =>
      set((state) => {
        state.errors = errors;
      }),

    clearError: (name) =>
      set((state) => {
        delete state.errors[name];
      }),

    nextStep: () =>
      set((state) => {
        state.currentStep += 1;
      }),

    prevStep: () =>
      set((state) => {
        state.currentStep -= 1;
      }),

    resetForm: () =>
      set((state) => {
        state.formData = {};
        state.rating = {};
        state.errors = {};
        state.currentStep = 0;
      }),
  })),
);
