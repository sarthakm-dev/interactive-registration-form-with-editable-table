import { getState, setState } from '../../app.state';
import * as appLogic from '../../app.logic';
import { renderApp } from '.././App';
import { createElement } from '../../utils/createElement';
import { createButton } from '../../utils/createButton';

export function renderNavigation(): HTMLElement {
  const nav = createElement('div', { className: 'rating-nav' });
  const isFirstStep = getState.currentStep === 0 ;
  const isLastStep = getState.currentStep === 3;
  const prevBtn = createButton('Previous', {
    attributes: { id: 'prevBtn', type: 'button' },
    onClick: () => {
      const prev = Math.max(getState.currentStep - 1, 0);
      setState({ currentStep: prev });
      renderApp();
    },
  });
  prevBtn.disabled = isFirstStep;
  const nextBtn = createButton('Next', {
    attributes: {
      id: 'nextBtn',
      type: 'button',
    },
    onClick: () => {
      const { valid, errors } = appLogic.validateCurrentStep(
        getState.currentStep,
        getState.formData,
        getState.ratingData
      );

      if (!valid) {
        setState({ validationErrors: errors });
        renderApp();
        return;
      }

      setState({
        currentStep: getState.currentStep + 1,
        validationErrors: {}
      });
      renderApp();
    }
  });
  nextBtn.disabled = isLastStep;
  nav.appendChild(prevBtn);
  nav.appendChild(nextBtn);

  return nav;
}