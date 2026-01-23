import { getState } from '../app.state';
import { renderBasicDetails } from './form/BasicDetails';
import { renderStepper } from './form/Stepper';
import { renderRatingSections } from './rating/RatingContainer';
import { renderNavigation } from './form/Navigation';
import { handleSubmit } from './form/HandleSubmit';
import { createElement } from '../utils/createElement';
import { createButton } from '../utils/createButton';
import { ThemeToggle } from './ThemeToggle';


export function Form(): HTMLElement {
  const container = createElement('div', { className: 'left-panel glass' });
  container.appendChild(ThemeToggle());
  const form = createElement('form', {
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
  const submitBtn = createButton(getState.editingIndex !== null ? 'Update' : 'Submit', {
    className: 'submit-btn',
    attributes: { id: 'submit', type: 'submit' },
    onClick: (e) => handleSubmit(e),
  });
  if(getState.currentStep === 3)
    form.appendChild(submitBtn);

  // Attach form submit listener
  form.addEventListener('submit', (e) => handleSubmit(e));

  container.appendChild(form);
  return container;
}


















