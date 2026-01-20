import { appState } from '../app.state';
import * as dom from '../utils/dom';
import { Form } from './Form';
import { Table } from './Table';

/**
 * App Component (Root)
 * Orchestrates the full page render
 * This is called after every state change
 */

export function App(): HTMLElement {
  const appContainer = dom.createElement('div', { attributes: { id: 'app-container' } });

  // Left panel - Form
  const formComponent = Form();
  appContainer.appendChild(formComponent);

  // Right panel - Table
  const rightPanel = dom.createElement('div', { className: 'right-panel glass' });
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

  return appContainer;
}

function createRatingsModal(): HTMLElement {
  const modal = dom.createElement('div', {
    className: 'modal-overlay hidden',
    attributes: { id: 'modal-overlay' },
  });

  const modalContent = dom.createElement('div', { className: 'modal-content' });
  const modalHeader = dom.createElement('div', { className: 'modal-header' });
  const modalTitle = dom.createElement('h2', { text: 'View Ratings' });
  modalHeader.appendChild(modalTitle);
  const closeBtn = dom.createButton('✕', {
    className: 'modal-close',
    onClick: () => {
      dom.addClass(modal, 'hidden');
    },
  });
  modalHeader.appendChild(closeBtn);
  modalContent.appendChild(modalHeader);

  const modalBody = dom.createElement('div', { className: 'modal-body' });
  modalContent.appendChild(modalBody);

  modal.appendChild(modalContent);
  return modal;
}

function createDeleteModal(): HTMLElement {
  const modal = dom.createElement('div', {
    className: 'modal-overlay hidden',
    attributes: { id: 'delete-modal-overlay' },
  });

  const modalContent = dom.createElement('div', { className: 'modal-content small' });
  const modalBody = dom.createElement('div', { className: 'modal-body' });
  const message = dom.createElement('p', {
    text: 'Are you sure you want to delete this record?',
    attributes: { id: 'delete-message' },
  });
  modalBody.appendChild(message);

  const buttonContainer = dom.createElement('div', { className: 'modal-buttons' });
  const confirmBtn = dom.createButton('Delete', {
    className: 'delete-confirm',
    attributes: { id: 'delete-confirm' },
    onClick: () => {
      // This will be handled by Table component
    },
  });
  const cancelBtn = dom.createButton('Cancel', {
    className: 'modal-cancel',
    attributes: { id: 'delete-cancel' },
    onClick: () => {
      dom.addClass(modal, 'hidden');
    },
  });

  buttonContainer.appendChild(confirmBtn);
  buttonContainer.appendChild(cancelBtn);
  modalBody.appendChild(buttonContainer);
  modalContent.appendChild(modalBody);

  modal.appendChild(modalContent);
  return modal;
}

function createSuccessModal(): HTMLElement {
  const modal = dom.createElement('div', {
    className: 'modal-overlay hidden',
    attributes: { id: 'success-modal-overlay' },
  });

  const modalContent = dom.createElement('div', { className: 'modal-content small' });
  const modalBody = dom.createElement('div', { className: 'modal-body' });
  const message = dom.createElement('p', {
    text: 'Form submitted successfully',
    attributes: { id: 'success-message' },
  });
  modalBody.appendChild(message);

  const okBtn = dom.createButton('OK', {
    className: 'modal-ok',
    attributes: { id: 'success-ok' },
    onClick: () => {
      dom.addClass(modal, 'hidden');
    },
  });
  modalBody.appendChild(okBtn);
  modalContent.appendChild(modalBody);

  modal.appendChild(modalContent);
  return modal;
}

let appRoot: HTMLElement | null = null;

export function renderApp(): void {
  const root = dom.queryId('app');
  if (!root) {
    console.error('Root element with id="app" not found');
    return;
  }

  // Clear old content
  dom.clearElement(root);

  // Render new content
  const newApp = App();
  root.appendChild(newApp);

  appRoot = newApp;
}