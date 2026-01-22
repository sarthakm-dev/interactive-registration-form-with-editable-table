import { addClass } from '../../utils/addClass';
import { createButton } from '../../utils/createButton';
import { createElement } from '../../utils/createElement';

export function createDeleteModal(): HTMLElement {
  const modal = createElement('div', {
    className: 'modal-overlay hidden',
    attributes: { id: 'delete-modal-overlay' },
  });

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
    
  });
  const cancelBtn = createButton('Cancel', {
    className: 'modal-cancel',
    attributes: { id: 'delete-cancel' },
    onClick: () => {
      addClass(modal, 'hidden');
    },
  });

  buttonContainer.appendChild(confirmBtn);
  buttonContainer.appendChild(cancelBtn);
  modalBody.appendChild(buttonContainer);
  modalContent.appendChild(modalBody);

  modal.appendChild(modalContent);
  return modal;
}