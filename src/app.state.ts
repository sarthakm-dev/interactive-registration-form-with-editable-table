import { type AppState } from './types/state';
import { type RecordData } from './types/record';
import { initializeRatingMap } from './utils/initializeRatings';


export const appState: AppState = {
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
    recommendToFriends: null,
    whatDidYouLike: null,
    whatToImprove: null,
    additionalComments: null,
    participateInMonthlyReview: 'no',
    ratings: initializeRatingMap(),
  },
  validationErrors: {},
};

export function setState(updates: Partial<AppState>): void {
  Object.assign(appState, updates);
}



export function resetStep(): void {
  appState.currentStep = 0;
}