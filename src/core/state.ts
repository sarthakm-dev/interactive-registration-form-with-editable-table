import { type AppState } from '../types/state';
import { initializeRatingMap } from '../utils/initialize-rating';
import { stateNotifier } from './pubsub';

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
  Object.entries(updates).forEach(([key, newValue]) => {
    const oldValue = getState[key as keyof AppState];
    (getState as any)[key] = newValue;
    // Notify subscribers about this state change
    stateNotifier.notify(key, newValue, oldValue);
  });
}


export function subscribe(
  key: keyof AppState,
  callback: (newValue: any, oldValue?: any) => void
) {
  return stateNotifier.subscribe(key as string, callback);
}





