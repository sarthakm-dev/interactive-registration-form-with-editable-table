import { state } from '../app.state';
import { renderApp } from './App';

export function ThemeToggle(): HTMLButtonElement {
  const btn = document.createElement('button');
  btn.textContent = state.theme === 'light' ? 'Dark' : 'Light';

  btn.addEventListener('click', () => {
    state.theme = state.theme === 'light' ? 'dark' : 'light';
    document.body.className = `theme-${state.theme}`;
    renderApp();
  });

  return btn;
}