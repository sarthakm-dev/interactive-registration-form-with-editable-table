import { state } from '../app.state';
import {Table} from './Table';
import {Form} from './Form';
import { ThemeToggle } from './ThemeToggle';

export function renderApp(): void {
  const root = document.getElementById('app');
  if (!root) throw new Error('Root not found');

  root.innerHTML = '';
  root.className = `theme-${state.theme}`;

  const app = document.createElement('div');
  app.className = 'app';

  app.appendChild(ThemeToggle());
  app.appendChild(Form());
  app.appendChild(Table());

  root.appendChild(app);
}