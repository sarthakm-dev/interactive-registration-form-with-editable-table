import { getState, setState, subscribe } from '../../core/state';
import { saveRecordsToStorage } from '../../core/storage';
import { deleteRecordFromList } from '../../services/delete-services-from-list';
import { createButton } from '../../ui/create-button';
import { createElement } from '../../ui/create-element';

function renderDeleteModalContent(): HTMLElement {
  const modal = createElement('div', {
    className: 'modal-overlay',
    attributes: { id: 'delete-modal-overlay' },
  });
  
  // Show modal if deletingIndex is set, hide otherwise
  modal.classList.add('hidden');
  if (getState.deletingIndex !== null) {
    modal.classList.remove('hidden');
  }

  const modalContent = createElement('div', { className: 'modal-content small' });
  const modalBody = createElement('div', { className: 'modal-body' });
  const message = createElement('p', {
    text: 'Are you sure you want to delete this record?',
    attributes: { id: 'delete-message' },
  });
  modalBody.appendChild(message);

  const buttonContainer = createElement('div', { className: 'modal-buttons' });
  const confirmBtn = createButton('Delete', {
    className: 'delete-confirm',
    attributes: { id: 'delete-confirm' },
    onClick: () => {
      if (getState.deletingIndex !== null) {
        const newRecords = deleteRecordFromList(getState.records, getState.deletingIndex);
        setState({ records: newRecords, deletingIndex: null, validationErrors: {} });
        saveRecordsToStorage(newRecords);
      }
    },
  });
  const cancelBtn = createButton('Cancel', {
    className: 'modal-cancel',
    attributes: { id: 'delete-cancel' },
    onClick: () => {
      setState({ deletingIndex: null });
    },
  });

  buttonContainer.appendChild(confirmBtn);
  buttonContainer.appendChild(cancelBtn);
  modalBody.appendChild(buttonContainer);
  modalContent.appendChild(modalBody);

  modal.appendChild(modalContent);
  return modal;
}

export function createDeleteModal(): HTMLElement {
  const container = document.createElement('div');
  container.id = 'delete-modal-container';
  container.appendChild(renderDeleteModalContent());
  

  subscribe('deletingIndex', (newValue) => {
    const modal = document.getElementById('delete-modal-overlay');
    if (modal) {
      if (newValue !== null) {
        modal.classList.remove('hidden');
      } else {
        modal.classList.add('hidden');
      }
    }
  });
  
  return container;
}