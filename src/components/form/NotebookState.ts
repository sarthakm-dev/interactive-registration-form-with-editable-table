import { setState } from '../../app.state';
import { initializeRatingMap } from '../../utils/initializeRatings';

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
      recommendToFriends: null,
      whatDidYouLike: null,
      whatToImprove: null,
      additionalComments: null,
      participateInMonthlyReview: 'no',
      ratings: initializeRatingMap(),
    },
  });

  const submitBtn = document.getElementById('submit');
  if (submitBtn) {
    submitBtn.textContent = "Submit"
  }
}