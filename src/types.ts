export type Theme = 'light' | 'dark';

export type RatingKey =
  | 'productQuality'
  | 'deliveryExperience'
  | 'supportExperience';

export type FieldKey =
  | 'orderNumber'
  | 'email'
  | 'purchaseDate'
  | 'shoppingMethod'
  | 'supportContacted'
  | RatingKey
  | 'like'
  | 'improve'
  | 'additional'
  |  'recommendToFriends'
  | 'packageContentMatch'
  | 'participateInMonthlyReview'

export interface FormState {
  values: Record<FieldKey, string>;
  errors: Partial<Record<FieldKey, string>>;
  touched: Partial<Record<FieldKey, boolean>>;
}

export interface FeedbackRecord {
  id: string;
  values: Record<FieldKey, string>;
}

export interface AppState {
  theme: Theme;
  step: number;
  editingId: string | null;
  feedback: FeedbackRecord[];
  form: FormState;
}

export enum Step {
  ORDER = 0,
  FEEDBACK = 1,
  RATINGS = 2,
  FINAL = 3
}

export interface FieldConfig {
  key: string;
  label: string;
  type: 'text' | 'email' | 'date' | 'select' | 'radio' | 'textarea' | 'rating';
  step: Step;
  options?: string[];
  ratingKey?: string;
}
