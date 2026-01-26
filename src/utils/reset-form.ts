import { getState } from "../core/state";
import { initializeRatingMap } from "./initialize-rating";
export function resetForm(): void {
  getState.formData = {
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
  getState.ratingData = initializeRatingMap();
  getState.editingIndex = null;
  getState.validationErrors = {};
}
