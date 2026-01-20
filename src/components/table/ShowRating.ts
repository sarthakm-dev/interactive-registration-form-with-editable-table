import * as dom from '../../utils/dom';
import { type RecordData } from '../../types/record';

export function showRatingModal(record: RecordData): void {
  const modal = dom.queryId('modal-overlay');
  const modalBody = modal?.querySelector('.modal-body');
  if (!modal || !modalBody) return;

  // Render ratings table
  const tableBody = dom.createElement('tbody');
  Object.entries(record.ratings).forEach(([category, rating]) => {
    const tr = dom.createElement('tr');

    const tdCategory = dom.createElement('td', {
      text: category.replace(/-/g, ' '),
    });
    tr.appendChild(tdCategory);

    const tdRating = dom.createElement('td', {
      text: rating === 0 ? 'N/A' : String(rating),
    });
    tr.appendChild(tdRating);

    tableBody.appendChild(tr);
  });

  const ratingsTable = dom.createElement('table', {
    className: 'ratings-table',
  });
  const thead = dom.createElement('thead');
  const headerRow = dom.createElement('tr');
  ['Category', 'Rating'].forEach((h) => {
    const th = dom.createElement('th', { text: h });
    headerRow.appendChild(th);
  });
  thead.appendChild(headerRow);
  ratingsTable.appendChild(thead);
  ratingsTable.appendChild(tableBody);

  // Find ratings table container and replace it
  const existingTable = modalBody.querySelector('table.ratings-table');
  if (existingTable) {
    existingTable.replaceWith(ratingsTable);
  } else {
    modalBody.appendChild(ratingsTable);
  }

  // Render optional text fields
  const optionalDiv = dom.createElement('div', { className: 'optional-text-modal' });

  if (record.whatDidYouLike) {
    const p1 = dom.createElement('p');
    const label1 = dom.createElement('strong', { text: 'What Did You Like:' });
    p1.appendChild(label1);
    p1.appendChild(document.createTextNode(` ${record.whatDidYouLike}`));
    optionalDiv.appendChild(p1);
  }

  if (record.whatToImprove) {
    const p2 = dom.createElement('p');
    const label2 = dom.createElement('strong', { text: 'What To Improve:' });
    p2.appendChild(label2);
    p2.appendChild(document.createTextNode(` ${record.whatToImprove}`));
    optionalDiv.appendChild(p2);
  }

  if (record.additionalComments) {
    const p3 = dom.createElement('p');
    const label3 = dom.createElement('strong', {
      text: 'Additional Comments:',
    });
    p3.appendChild(label3);
    p3.appendChild(document.createTextNode(` ${record.additionalComments}`));
    optionalDiv.appendChild(p3);
  }

  const existingOptional = modalBody.querySelector('.optional-text-modal');
  if (existingOptional) {
    existingOptional.replaceWith(optionalDiv);
  } else {
    modalBody.appendChild(optionalDiv);
  }

  // Show modal
  dom.removeClass(modal, 'hidden');

  // Setup close handler
  const closeBtn = modal.querySelector('.close-btn');
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      dom.addClass(modal, 'hidden');
    });
  }
}