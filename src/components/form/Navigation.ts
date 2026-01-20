import { appState, setState } from '../../app.state';
import * as appLogic from '../../app.logic';
import * as dom from '../../utils/dom';
import { renderApp } from '.././App';

export function renderNavigation(): HTMLElement {
  const nav = dom.createElement('div', { className: 'rating-nav' });

  const prevBtn = dom.createButton('Previous', {
    attributes: { id: 'prevBtn', type: 'button' },
    onClick: () => {
      const prev = Math.max(appState.currentStep - 1, 0);
      setState({ currentStep: prev });
      renderApp();
    },
  });

  const nextBtn = dom.createButton('Next', {
    attributes: { id: 'nextBtn', type: 'button' },
    onClick: () => {
     
      const { valid, errors } = appLogic.validateCurrentStep(
        appState.currentStep,
        appState.formData,
        appState.ratingData,
      );

      if (!valid) {
        setState({ validationErrors: errors });
        renderApp();
        return;
      }

      const next = Math.min(appState.currentStep + 1, 3);
      setState({ currentStep: next, validationErrors: {} });
      renderApp();
    },
  });

  nav.appendChild(prevBtn);
  nav.appendChild(nextBtn);

  return nav;
}