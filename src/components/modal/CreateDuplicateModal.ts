import { getState } from '../../app.state';
import { addClass } from '../../utils/addClass';
import { createButton } from '../../utils/createButton';
import { createElement } from '../../utils/createElement';

export function createDuplicateModal(): HTMLElement {
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
      addClass(modal, 'hidden');
    },
  });
  modalBody.appendChild(okBtn);
  modalContent.appendChild(modalBody);

  modal.appendChild(modalContent);
  return modal;
}