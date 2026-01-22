import { addClass } from "../../utils/addClass";
import { createButton } from "../../utils/createButton";
import { createElement } from "../../utils/createElement";

export function createRatingsModal(): HTMLElement {
  const modal = createElement('div', {
    className: 'modal-overlay hidden',
    attributes: { id: 'modal-overlay' },
  });

  const modalContent = createElement('div', { className: 'modal-content' });
  const modalHeader = createElement('div', { className: 'modal-header' });
  const modalTitle = createElement('h2', { text: 'View Ratings' });
  modalHeader.appendChild(modalTitle);
  const closeBtn = createButton('✕', {
    className: 'modal-close',
    onClick: () => {
      addClass(modal, 'hidden');
    },
  });
  modalHeader.appendChild(closeBtn);
  modalContent.appendChild(modalHeader);

  const modalBody = createElement('div', { className: 'modal-body' });
  modalContent.appendChild(modalBody);

  modal.appendChild(modalContent);
  return modal;
}