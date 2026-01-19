import { state } from '../app.state';
import { renderApp } from './App';

export function Stepper(): HTMLElement {
  const wrapper = document.createElement('div');
  wrapper.className = 'stepper';

  ['Order', 'Feedback'].forEach((label, index) => {
    const btn = document.createElement('button');
    btn.textContent = label;
    btn.className = state.step === index ? 'active' : '';

    btn.onclick = () => {
      state.step = index;
      renderApp();
    };

    wrapper.appendChild(btn);
  });

  return wrapper;
}