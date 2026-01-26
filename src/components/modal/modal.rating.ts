import { subscribe } from "../../core/state";
import { updateElementInPlace } from "../../ui/update-element";
import { createElement } from "../../ui/create-element";
import { createButton } from "../../ui/create-button";


function renderRatingModalContent(): HTMLElement {
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
      const overlay = document.getElementById('modal-overlay');
      if (overlay) {
        overlay.classList.add('hidden');
      }
    },
  });
  modalHeader.appendChild(closeBtn);
  modalContent.appendChild(modalHeader);

  const modalBody = createElement('div', { className: 'modal-body' });
  modalContent.appendChild(modalBody);

  modal.appendChild(modalContent);
  return modal;
}

export function createRatingsModal(): HTMLElement {
  const container = document.createElement('div');
  container.id = 'rating-modal-container';
  container.appendChild(renderRatingModalContent());
  

  subscribe('ratingData', () => {
    updateElementInPlace('rating-modal-container', renderRatingModalContent);
  });
  
  return container;
}