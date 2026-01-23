import { getState } from '../app.state';
import { createElement } from '../utils/createElement';
import { Form } from './Form';
import { createDeleteModal } from './modal/CreateDeleteModal';
import { createDuplicateModal } from './modal/CreateDuplicateModal';
import { createRatingsModal } from './modal/CreateRatingModal';
import { createSuccessModal } from './modal/CreateSuccessModal';
import { Table } from './Table';

function App(): HTMLElement {
  const appContainer = createElement('div', { attributes: { id: 'app-container' } });
  // Left panel - Form
  const formComponent = Form();
  appContainer.appendChild(formComponent);

  // Right panel - Table
  const rightPanel = createElement('div', { className: 'right-panel glass' });
  const tableComponent = Table();
  rightPanel.appendChild(tableComponent);
  appContainer.appendChild(rightPanel);

  // Modals
  const ratingsModal = createRatingsModal();
  appContainer.appendChild(ratingsModal);

  const deleteModal = createDeleteModal();
  appContainer.appendChild(deleteModal);

  const successModal = createSuccessModal();
  appContainer.appendChild(successModal);

  const duplicateModal = createDuplicateModal();
  appContainer.appendChild(duplicateModal);
  return appContainer;
}

export function renderApp(): void {
  const head = document.documentElement;
  head.setAttribute('data-theme',getState.theme);
  const root = document.getElementById('app');
  if (!root) {
    console.error('Root element with id="app" not found');
    return;
  }

  // Clear old content
  root.innerHTML = '';

  // Render new content
  const newApp = App();
  root.appendChild(newApp);
}