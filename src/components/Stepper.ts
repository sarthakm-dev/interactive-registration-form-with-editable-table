import { state } from '../app.state';
import { renderApp } from './App';

export function Stepper(): HTMLDivElement {
  const stepper = document.createElement('div');
  stepper.className = 'stepper';

  ['Order', 'Feedback'].forEach((label, index) => {
    const step = document.createElement('button');
    step.textContent = label;
    step.className = index === state.step ? 'step active' : 'step';

    step.onclick = () => {
      state.step = index;
      renderApp();
    };

    stepper.appendChild(step);
  });

  return stepper;
}