import { addClass } from '../../utils/addClass';
import { createButton } from '../../utils/createButton';
import { createElement } from '../../utils/createElement';

export function createDuplicateModal(): HTMLElement {
  const modal = createElement('div', {
    className: 'modal-overlay hidden',
    attributes: { id: 'duplicate-modal-overlay' },
  });

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
      addClass(modal, 'hidden');
    },
  });
  modalBody.appendChild(okBtn);
  modalContent.appendChild(modalBody);

  modal.appendChild(modalContent);
  return modal;
}