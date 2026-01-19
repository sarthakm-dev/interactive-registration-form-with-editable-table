import { loadFromStorage } from './app.storage';
import { renderApp } from './components/App';

document.addEventListener('DOMContentLoaded', () => {
  loadFromStorage();
  renderApp();
});