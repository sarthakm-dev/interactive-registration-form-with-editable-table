import { appState, setState } from '../../app.state';

import * as dom from '../../utils/dom';
import { renderApp } from '.././App';

export function renderStepper(): HTMLElement {
  const stepper = dom.createElement('div', { className: 'rating-stepper' });

  const steps = [
    { icon: '/assets/package.png', label: 'Product' },
    { icon: '/assets/cart.png', label: 'Website' },
    { icon: '/assets/delivery.png', label: 'Delivery' },
    { icon: '/assets/help.png', label: 'Support' },
  ];

  steps.forEach((step, index) => {
    const stepEl = dom.createElement('div', {
      className: appState.currentStep === index ? ['step', 'active'] : ['step'],
      attributes: { 'data-step': String(index) },
    });
    const iconbox = dom.createElement('div',{
      className: 'step-icon-box',
    })
    const icon = dom.createElement('img', {
      attributes: {
        src: step.icon,
        alt: step.label
      },
      className: 'step-icon',
    });
    iconbox.appendChild(icon);
    stepEl.appendChild(iconbox);
    stepEl.appendChild(dom.createElement('small', { text: step.label }));
    stepEl.addEventListener('click', () => {
      setState({ currentStep: index });
      renderApp();
    });
    stepper.appendChild(stepEl);
  });

  return stepper;
}