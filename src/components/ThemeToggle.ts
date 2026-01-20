/*import { state } from '../app.state';
import { renderApp } from './App';

export function ThemeToggle(): HTMLButtonElement {
  const btn = document.createElement('button');
  btn.textContent = state.theme === 'light' ? 'Dark' : 'Light';

  btn.onclick = () => {
    state.theme = state.theme === 'light' ? 'dark' : 'light';
    renderApp();
  };

  return btn;
}
  */