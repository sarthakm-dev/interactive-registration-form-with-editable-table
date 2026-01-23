import { getState } from '../../app.state';
import { renderBasicDetails } from './form.basic-details';
import { renderStepper } from './form.stepper';
import { renderRatingSections } from '../rating';
import { renderNavigation } from './form.navigation';
import { handleSubmit } from './form.submit';
import { createElement } from '../../ui/createElement';
import { ThemeToggle } from '../ThemeToggle';
import { createButton } from '../../ui/createButton';


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


















