import { getState, setState } from '../../core/state';
import { validateStep } from '../../services/validation-service';
import { createButton } from '../../ui/create-button';
import { createElement } from '../../ui/create-element';

export function renderNavigation(): HTMLElement {
  const nav = createElement('div', { className: 'rating-nav' });
  const isFirstStep = getState.currentStep === 0 ;
  const isLastStep = getState.currentStep === 3;
  const prevBtn = createButton('Previous', {
    attributes: { id: 'prevBtn', type: 'button' },
    onClick: () => {
      const prev = Math.max(getState.currentStep - 1, 0);
      setState({ currentStep: prev, validationErrors: {} });
    },
  });
  prevBtn.disabled = isFirstStep;
  const nextBtn = createButton('Next', {
    attributes: {
      id: 'nextBtn',
      type: 'button',
    },
    onClick: () => {
      const { valid, errors } = validateStep(
        getState.currentStep,
        getState.formData,
        getState.ratingData
      );
      if (!valid) {
        setState({ validationErrors: errors });
        return;
      }

      setState({
        currentStep: getState.currentStep + 1,
        validationErrors: {}
      });
    }
  });
  nextBtn.disabled = isLastStep;
  nav.appendChild(prevBtn);
  nav.appendChild(nextBtn);

  return nav;
}

