import { type AppState } from './types/state';
import { type RecordData } from './types/record';
import { type RatingMap } from './types/ratings';
// Global mutable state - SINGLE SOURCE OF TRUTH
export const appState: AppState = {
  records: [],
  currentStep: 0,
  editingIndex: null,
  deletingIndex: null,
  ratingData: initializeRatingMap(),
  formData: createEmptyFormData(),
  validationErrors: {},
};

function createEmptyFormData(): Partial<RecordData> {
  return {
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
  };
}

function initializeRatingMap(): RatingMap {
  return {
    'product-quality': 0,
    'matches-description': 0,
    durability: 0,
    'value-for-money': 0,
    'websites-ease-of-use': 0,
    'product-search': 0,
    'checkout-process': 0,
    'payment-options': 0,
    'delivery-experience': 0,
    'delivery-speed': 0,
    'packaging-quality': 0,
    'support-responsiveness': 0,
    'support-helpfulness': 0,
  };
}

// State mutations - called by logic functions
export function setState(updates: Partial<AppState>): void {
  Object.assign(appState, updates);
}

export function resetForm(): void {
  appState.formData = createEmptyFormData();
  appState.editingIndex = null;
  appState.validationErrors = {};
}

export function resetStep(): void {
  appState.currentStep = 0;
}