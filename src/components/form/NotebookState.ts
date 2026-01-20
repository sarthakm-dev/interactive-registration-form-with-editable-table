import { appState, setState } from '../../app.state';
import * as dom from '../../utils/dom';

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
      ratings: appState.ratingData,
    },
  });

  const submitBtn = dom.queryId('submit');
  if (submitBtn) {
    dom.setText(submitBtn, 'Submit');
  }
}