import { getState, setState, subscribe } from '../../core/state';
import { createButton } from '../../ui/create-button';
import { createElement } from '../../ui/create-element';

function renderSuccessModalContent(): HTMLElement {
  const modal = createElement('div', {
    className: 'modal-overlay',
    attributes: { id: 'success-modal-overlay' },
  });
  modal.classList.add('hidden');
  if(getState.showSuccessModal){
    modal.classList.remove('hidden');
  }
  const modalContent = createElement('div', { className: 'modal-content small' });
  const modalBody = createElement('div', { className: 'modal-body' });
  const message = createElement('p', {
    text: 'Form submitted successfully',
    attributes: { id: 'success-message' },
  });
  modalBody.appendChild(message);

  const okBtn = createButton('OK', {
    className: 'modal-ok',
    attributes: { id: 'success-ok' },
    onClick: () => {
      setState({showSuccessModal:false});
    },
  });
  modalBody.appendChild(okBtn);
  modalContent.appendChild(modalBody);

  modal.appendChild(modalContent);
  return modal;
}

export function createSuccessModal(): HTMLElement {
  const container = document.createElement('div');
  container.id = 'success-modal-container';
  container.appendChild(renderSuccessModalContent());
  
  // Update visibility without full re-render
  subscribe('showSuccessModal', (newValue) => {
    const modal = document.getElementById('success-modal-overlay');
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

