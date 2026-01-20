// Central type definitions
export type RatingValue = 0 | 1 | 2 | 3 | 4 | 5;

export interface RatingMap {
  [category: string]: RatingValue;
}

export interface RecordData {
  orderNumber: string | null;
  email: string | null;
  purchaseDate: string | null;
  shoppingMethod: string | null;
  packageContentMatch: string | null;
  supportContacted: string | null;
  recommendToFriends: string | null;
  whatDidYouLike: string | null;
  whatToImprove: string | null;
  additionalComments: string | null;
  participateInMonthlyReview: string;
  ratings: RatingMap;
}

export interface AppState {
  records: RecordData[];
  currentStep: number;
  editingIndex: number | null;
  deletingIndex: number | null;
  ratingData: RatingMap;
  formData: Partial<RecordData>;
  validationErrors: ValidationErrors;
}

export interface ValidationErrors {
  [field: string]: boolean | undefined;
}

export interface StepConfig {
  ratings: string[];
  conditionalOn?: string;
}