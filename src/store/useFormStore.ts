import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { validateStep } from '../features/survey/utils/validate-step';
import type { FormValues } from '../features/survey/types/form';
import { initialFormData, type FormState } from '../shared/types/form-state';

export const useFormStore = create<FormState>()(
  immer((set, get) => ({
    formData: initialFormData,
    rating: {},
    errors: {},
    currentStep: 0,

    setField: (name, value) =>
      set((state) => {
        (state.formData as FormValues)[name] = value;
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

    nextStep: () => {
      const { currentStep, formData, rating } = get();
      const result = validateStep(currentStep, formData, rating);

      if (!result.valid) {
        set((state) => {
          state.errors = result.errors;
        });
        return false;
      }

      set((state) => {
        state.currentStep += 1;
        state.errors = {};
      });

      return true;
    },

    prevStep: () =>
      set((state) => {
        state.currentStep = Math.max(0, state.currentStep - 1);
      }),

    submit: () => {
      const { currentStep, formData, rating } = get();
      const result = validateStep(currentStep, formData, rating);

      if (!result.valid) {
        set((state) => {
          state.errors = result.errors;
        });
        return false;
      }

      return true;
    },

    resetForm: () =>
      set((state) => {
        state.formData = initialFormData;
        state.rating = {};
        state.errors = {};
        state.currentStep = 0;
      }),

    hydrateFromRow: (row) =>
      set((state) => {
        state.formData = { ...row };
        state.rating = row.ratings || {};
        state.errors = {};
        state.currentStep = 0;
      }),
  })),
);
