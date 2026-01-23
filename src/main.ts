import { setState } from './app.state';
import { loadRecordsFromStorage } from './app.storage';
import { renderApp } from './components';

function initializeApp(): void {
  const records = loadRecordsFromStorage();
  setState({ records });
  renderApp();
}
initializeApp();