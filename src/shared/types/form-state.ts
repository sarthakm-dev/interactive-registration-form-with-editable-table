import type { FormValues } from '../../features/survey/types/form';

export type FormState = {
  formData: FormValues;
  rating: Record<string, number>;
  errors: Record<string, string>;
  currentStep: number;

  setField: <K extends keyof FormValues>(name: K, value: FormValues[K]) => void;
  setRating: (category: string, value: number) => void;
  setErrors: (errors: Record<string, string>) => void;
  clearError: (name: string) => void;

  nextStep: () => boolean;
  prevStep: () => void;
  submit: () => boolean;

  resetForm: () => void;
  hydrateFromRow: (row: any) => void;
};

export const initialFormData: FormValues = {
  orderNumber: '',
  email: '',
  purchaseDate: '',
  shoppingMethod: '',
  supportContacted: 'no',
  recommendationExperience: '',
  whatDidYouLike: '',
  whatToImprove: '',
  additionalComment: '',
  review: false,
};
