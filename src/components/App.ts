import { state } from '../app.state';
import { Form } from './Form';
import { Table } from './Table';
import { ThemeToggle } from './ThemeToggle';
import { saveToStorage } from '../app.storage';

export function renderApp(): void {
  const root = document.getElementById('app');
  if (!root) throw new Error('No root');

  root.innerHTML = '';
  root.className = `theme-${state.theme}`;

  const app = document.createElement('div');
  app.className = 'layout';

  app.appendChild(ThemeToggle());
  app.appendChild(Form());
  app.appendChild(Table());

  root.appendChild(app);
  saveToStorage();
}