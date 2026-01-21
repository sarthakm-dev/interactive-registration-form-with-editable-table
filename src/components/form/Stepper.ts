import { getState, setState } from '../../app.state';
import { createElement } from '../../utils/createElement';
import { renderApp } from '.././App';

export function renderStepper(): HTMLElement {
  const stepper = createElement('div', { className: 'rating-stepper' });

  const steps = [
    { icon: '/assets/package.png', label: 'Product' },
    { icon: '/assets/cart.png', label: 'Website' },
    { icon: '/assets/delivery.png', label: 'Delivery' },
    { icon: '/assets/help.png', label: 'Support' },
  ];

  steps.forEach((step, index) => {
    const stepEl = createElement('div', {
      className: getState.currentStep === index ? ['step', 'active'] : ['step'],
      attributes: { 'data-step': String(index) },
    });
    const iconbox = createElement('div',{
      className: 'step-icon-box',
    })
    const icon = createElement('img', {
      attributes: {
        src: step.icon,
        alt: step.label
      },
      className: 'step-icon',
    });
    iconbox.appendChild(icon);
    stepEl.appendChild(iconbox);
    stepEl.appendChild(createElement('small', { text: step.label }));
    stepEl.addEventListener('click', () => {
      setState({ currentStep: index });
      renderApp();
    });
    stepper.appendChild(stepEl);
  });

  return stepper;
}