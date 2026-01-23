import { getState, setState } from '../../app.state';
import { addClass } from '../../ui/addClass';
import { createButton } from '../../ui/createButton';
import { createElement } from '../../ui/createElement';

export function createSuccessModal(): HTMLElement {
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
      addClass(modal, 'hidden');
      setState({showSuccessModal:false});
    },
  });
  modalBody.appendChild(okBtn);
  modalContent.appendChild(modalBody);

  modal.appendChild(modalContent);
  return modal;
}