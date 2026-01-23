import { setState } from "../../app.state";
import { initializeRatingMap } from "../../utils/initializeRating";


export function resetNotebookState(): void {
  setState({
    editingIndex: null,
    currentStep: 0,
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
  });

  const submitBtn = document.getElementById('submit');
  if (submitBtn) {
    submitBtn.textContent = "Submit"
  }
}