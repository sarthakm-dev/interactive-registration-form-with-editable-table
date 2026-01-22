import { addClass } from '../../utils/addClass';
import { createButton } from '../../utils/createButton';
import { createElement } from '../../utils/createElement';

export function createSuccessModal(): HTMLElement {
  const modal = createElement('div', {
    className: 'modal-overlay hidden',
    attributes: { id: 'success-modal-overlay' },
  });

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
      addClass(modal, 'hidden');
    },
  });
  modalBody.appendChild(okBtn);
  modalContent.appendChild(modalBody);

  modal.appendChild(modalContent);
  return modal;
}