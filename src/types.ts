export type Theme = 'light' | 'dark';

export interface RatingMap {
  [key: string]: number;
}

export interface FeedbackRecord {
  id: string;
  orderNumber: string;
  email: string;
  purchaseDate: string;
  shoppingMethod: string;
  supportContacted: string;
  rating: RatingMap;
  comment: {
    like: string;
    improve: string;
    additional: string;
  };
}

export interface FormState {
  orderNumber: string;
  email: string;
  purchaseDate: string;
  shoppingMethod: string;
  supportContacted: string;
  rating: RatingMap;
  comment: {
    like: string;
    improve: string;
    additional: string;
  };
}

export interface AppState {
  theme: Theme;
  step: number;
  editingId: string | null;
  feedback: FeedbackRecord[];
  form: FormState;
}