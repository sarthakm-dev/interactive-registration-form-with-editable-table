import { getState } from "../app.state";
import { initializeRatingMap } from "./initializeRatings";
export function resetForm(): void {
  getState.formData = {
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
  getState.ratingData = initializeRatingMap();
  getState.editingIndex = null;
  getState.validationErrors = {};
}