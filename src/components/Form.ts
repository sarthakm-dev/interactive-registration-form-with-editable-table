import { appState, setState, resetForm } from '../app.state';
import * as dom from '../utils/dom';
import { renderBasicDetails } from './form/BasicDetails';
import { renderStepper } from './form/Stepper';
import { renderRatingSections } from './rating/RatingContainer';
import { renderNavigation } from './form/Navigation';
import { handleSubmit } from './form/SubmitButton';
//import { RecordData } from '../types';

export function Form(): HTMLElement {
  const container = dom.createElement('div', { className: 'left-panel glass' });

  const form = dom.createElement('form', {
    attributes: { id: 'form-container' },
  });


  const basicDetails = renderBasicDetails();
  form.appendChild(basicDetails);


  const stepper = renderStepper();
  form.appendChild(stepper);

  // Rating sections
  const ratingSections = renderRatingSections();
  form.appendChild(ratingSections);

  // Navigation buttons
  const nav = renderNavigation();
  form.appendChild(nav);

  // Submit button
  const submitBtn = dom.createButton(appState.editingIndex !== null ? 'Update' : 'Submit', {
    className: 'submit-btn',
    attributes: { id: 'submit', type: 'submit' },
    onClick: (e) => handleSubmit(e),
  });
  form.appendChild(submitBtn);

  // Attach form submit listener
  form.addEventListener('submit', (e) => handleSubmit(e));

  container.appendChild(form);
  return container;
}


















function resetNotebookState(): void {
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