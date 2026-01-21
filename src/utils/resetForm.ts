import { appState } from "../app.state";
import { initializeRatingMap } from "./initializeRatings";
export function resetForm(): void {
  appState.formData = {
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
  appState.ratingData = initializeRatingMap();
  appState.editingIndex = null;
  appState.validationErrors = {};
}