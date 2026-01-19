import { state } from '../app.state';
import { renderApp } from './App';

export function FeedbackForm(): HTMLFormElement {
  const form = document.createElement('form');

  const order = document.createElement('input');
  order.value = state.form.orderNumber;

  order.addEventListener('input', e => {
    state.form.orderNumber = (e.target as HTMLInputElement).value;
  });

  const next = document.createElement('button');
  next.textContent = 'Next';

  next.addEventListener('click', e => {
    e.preventDefault();
    state.step++;
    renderApp();
  });

  form.append(order, next);
  return form;
}