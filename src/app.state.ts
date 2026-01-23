import { type AppState } from './types/state';
import { initializeRatingMap } from './utils/initializeRating';

export const getState: AppState = {
  theme: 'light',
  showDuplicateModal: false,
  showSuccessModal: false,
  records: [],
  currentStep: 0,
  editingIndex: null,
  deletingIndex: null,
  ratingData: initializeRatingMap(),
  formData: {
    orderNumber: null,
    email: null,
    purchaseDate: null,
    shoppingMethod: null,
    packageContentMatch: null,
    supportContacted: null,
    recommendToFriend: null,
    whatDidYouLike: null,
    whatToImprove: null,
    additionalComment: null,
    participateInMonthlyReview: 'no',
    rating: initializeRatingMap(),
  },
  validationErrors: {},
};

export function setState(updates: Partial<AppState>): void {
  Object.assign(getState, updates);
}



