import { setState, subscribe } from './core/state';
import { renderApp } from './components';
import { loadRecordsFromStorage } from './core/storage';

function initializeApp(): void {
  const records = loadRecordsFromStorage();
  
  // Initial app render
  setState({ records });
  renderApp();
  
  // Only theme changes trigger full app re-render
  // Other state changes trigger specific component updates via pub-sub
  subscribe('theme', () => {
    renderApp();
  });
}

initializeApp();

