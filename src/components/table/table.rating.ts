import { addClass } from '../../ui/addClass';
import { createElement } from '../../ui/createElement';
import { removeClass } from '../../utils/removeClass';
import { type RecordData } from '../../types/record';



export function showRatingModal(record: RecordData): void {
  const modal = document.getElementById('modal-overlay');
  const modalBody = modal?.querySelector('.modal-body');
  if (!modal || !modalBody) return;

  // Render ratings table
  const tableBody = createElement('tbody',{
    attributes: {
      id: 'ratings-table-body'
    }
  });
  Object.entries(record.rating).forEach(([category, rating]) => {
    const tr = createElement('tr');

    const tdCategory = createElement('td', {
      text: category.replace(/-/g, ' '),
    });
    tr.appendChild(tdCategory);

    const tdRating = createElement('td', {
      text: rating === 0 ? 'N/A' : String(rating),
    });
    tr.appendChild(tdRating);

    tableBody.appendChild(tr);
  });

  const ratingsTable = createElement('table', {
    className: 'ratings-table',
  });
  const thead = createElement('thead');
  const headerRow = createElement('tr');
  ['Category', 'Rating'].forEach((h) => {
    const th = createElement('th', { text: h });
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
  const optionalDiv = createElement('div', { className: 'optional-text-modal', attributes: { id:'optional-text-modal'} });

  if (record.whatDidYouLike) {
    const p1 = createElement('p');
    const label1 = createElement('strong', { text: 'What Did You Like:' });
    p1.appendChild(label1);
    p1.appendChild(document.createTextNode(` ${record.whatDidYouLike}`));
    optionalDiv.appendChild(p1);
  }

  if (record.whatToImprove) {
    const p2 = createElement('p');
    const label2 = createElement('strong', { text: 'What To Improve:' });
    p2.appendChild(label2);
    p2.appendChild(document.createTextNode(` ${record.whatToImprove}`));
    optionalDiv.appendChild(p2);
  }

  if (record.additionalComment) {
    const p3 = createElement('p');
    const label3 = createElement('strong', {
      text: 'Additional Comments:',
    });
    p3.appendChild(label3);
    p3.appendChild(document.createTextNode(` ${record.additionalComment}`));
    optionalDiv.appendChild(p3);
  }
  if(record.participateInMonthlyReview){
    const p3 = createElement('p');
    const label4 = createElement('strong', {
      text: 'Additional Comments:',
    });
    p3.appendChild(label4);
    p3.appendChild(document.createTextNode(` ${record.participateInMonthlyReview}`));
    optionalDiv.appendChild(p3);
  }
  const existingOptional = modalBody.querySelector('.optional-text-modal');
  if (existingOptional) {
    existingOptional.replaceWith(optionalDiv);
  } else {
    modalBody.appendChild(optionalDiv);
  }

  // Show modal
  removeClass(modal, 'hidden');

  // Setup close handler
  const closeBtn = modal.querySelector('.close-btn');
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      addClass(modal, 'hidden');
    });
  }
}