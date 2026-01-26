import { getState, subscribe } from '../../core/state';
import { renderBasicDetails } from './form.basic-details';
import { renderStepper } from './form.stepper';
import { renderRatingSections } from '../rating';
import { renderNavigation } from './form.navigation';
import { handleSubmit } from './form.submit';

import { ThemeToggle } from '../../ui/theme-toggle';
import { updateElementInPlace } from '../../ui/update-element';
import { createButton } from '../../ui/create-button';
import { createElement } from '../../ui/create-element';


function renderFormContent(): HTMLElement {
  const form = createElement('form', {
    attributes: { id: 'form-container' },
  });

  const basicDetails = renderBasicDetails();
  form.appendChild(basicDetails);

  const stepper = renderStepper();
  form.appendChild(stepper);

  const ratingSections = renderRatingSections();
  form.appendChild(ratingSections);

  const nav = renderNavigation();
  form.appendChild(nav);

  const submitBtn = createButton(getState.editingIndex !== null ? 'Update' : 'Submit', {
    className: 'submit-btn',
    attributes: { id: 'submit', type: 'submit' },
    onClick: (e) => handleSubmit(e),
  });
  if(getState.currentStep === 3)
    form.appendChild(submitBtn);

  form.addEventListener('submit', (e) => handleSubmit(e));
  return form;
}

export function Form(): HTMLElement {
  const container = createElement('div', { className: 'left-panel glass' });
  container.appendChild(ThemeToggle());
  
  const form = renderFormContent();
  container.appendChild(form);

  
  subscribe('currentStep', () => {
    updateElementInPlace('form-container', renderFormContent);
  });

  subscribe('editingIndex', () => {
    updateElementInPlace('form-container', renderFormContent);
  });

  subscribe('ratingData', () => {
    updateElementInPlace('form-container', renderFormContent);
  });

  subscribe('validationErrors', () => {
    updateElementInPlace('form-container', renderFormContent);
  });

  return container;
}





















