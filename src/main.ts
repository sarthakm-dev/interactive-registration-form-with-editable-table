import { renderApp } from './components/App';
import { loadState } from './app.storage';

document.addEventListener('DOMContentLoaded', () => {
  loadState();
  renderApp();
});


