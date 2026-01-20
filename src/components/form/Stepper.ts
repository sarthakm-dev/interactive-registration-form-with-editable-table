import { appState, setState, resetForm } from '../../app.state';

import * as dom from '../../utils/dom';
import { renderApp } from '.././App';

export function renderStepper(): HTMLElement {
  const stepper = dom.createElement('div', { className: 'rating-stepper' });

  const steps = [
    { icon: '📦', label: 'Product' },
    { icon: '🛒', label: 'Website' },
    { icon: '🚚', label: 'Delivery' },
    { icon: 'ℹ️', label: 'Support' },
  ];

  steps.forEach((step, index) => {
    const stepEl = dom.createElement('div', {
      className: appState.currentStep === index ? ['step', 'active'] : ['step'],
      attributes: { 'data-step': String(index) },
    });
    stepEl.appendChild(
      dom.createElement('div', {
        text: step.icon,
        className: 'step-icon',
      }),
    );
    stepEl.appendChild(dom.createElement('small', { text: step.label }));
    stepEl.addEventListener('click', () => {
      setState({ currentStep: index });
      renderApp();
    });
    stepper.appendChild(stepEl);
  });

  return stepper;
}