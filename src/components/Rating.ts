import { state } from '../app.state';
import {type RatingKey } from '../types';
import { renderApp } from './App';

export function Rating(
  key: RatingKey,
  label: string
): HTMLDivElement {
  const box = document.createElement('div');
  box.className = 'rating';

  const title = document.createElement('p');
  title.textContent = label;
  box.appendChild(title);

  for (let i = 1; i <= 5; i++) {
    const star = document.createElement('span');
    star.textContent = '★';
    star.className =
      Number(state.form.values[key]) >= i
        ? 'star active'
        : 'star';

    star.onclick = () => {
      state.form.values[key] = String(i);
      renderApp();
    };

    box.appendChild(star);
  }

  return box;
}