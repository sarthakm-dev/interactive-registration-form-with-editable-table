import { getState, setState, subscribe } from '../../core/state';
import { createButton } from '../../ui/create-button';
import { createElement } from '../../ui/create-element';

function renderDuplicateModalContent(): HTMLElement {
  const modal = createElement('div', {
    className: 'duplicate-overlay',
    attributes: { id: 'duplicate-overlay' },
  });
  modal.classList.add('hidden');
  if(getState.showDuplicateModal){
    modal.classList.remove('hidden');
  }
  const modalContent = createElement('div', { className: 'modal-content small' });
  const modalBody = createElement('div', { className: 'modal-body' });
  const message = createElement('p', {
    text: 'Duplicate Record Exists For same Email and Order Number',
    attributes: { id: 'duplicate-message' },
  });
  modalBody.appendChild(message);

  const okBtn = createButton('OK', {
    className: 'duplicate-ok',
    attributes: { id: 'duplicate-ok' },
    onClick: () => {
      setState({ showDuplicateModal: false, validationErrors: {} });
    },
  });
  modalBody.appendChild(okBtn);
  modalContent.appendChild(modalBody);

  modal.appendChild(modalContent);
  return modal;
}

export function createDuplicateModal(): HTMLElement {
  const container = document.createElement('div');
  container.id = 'duplicate-modal-container';
  container.appendChild(renderDuplicateModalContent());
  
  
  subscribe('showDuplicateModal', (newValue) => {
    const modal = document.getElementById('duplicate-overlay');
    if (modal) {
      if (newValue) {
        modal.classList.remove('hidden');
      } else {
        modal.classList.add('hidden');
      }
    }
  });
  
  return container;
}