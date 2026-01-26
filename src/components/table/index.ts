import { getState, subscribe } from '../../core/state';
import { createElement } from '../../ui/create-element';
import { renderTableRow } from './table.row';
import { updateElementInPlace } from '../../ui/update-element';


function renderTableContent(): HTMLElement {
  const table = createElement('table', {
    className: 'data-table',
    attributes: { id: 'main-table' },
  });

  // Create thead
  const thead = createElement('thead');
  const headerRow = createElement('tr');
  const headers = ['#', 'Order', 'Email', 'Purchase', 'Method', 'Actions'];
  headers.forEach((header) => {
    const th = createElement('th', { text: header });
    headerRow.appendChild(th);
  });
  thead.appendChild(headerRow);
  table.appendChild(thead);

  // Create tbody
  const tbody = createElement('tbody');
  getState.records.forEach((record, index) => {
    const tr = renderTableRow(record, index);
    tbody.appendChild(tr);
  });
  table.appendChild(tbody);

  return table;
}

export function Table(): HTMLElement {
  const container = createElement('div', { className: 'table-panel' });
  const table = renderTableContent();
  container.appendChild(table);

  
  subscribe('records', () => {
    updateElementInPlace('main-table', renderTableContent);
  });


  subscribe('editingIndex', () => {
    updateElementInPlace('main-table', renderTableContent);
  });

  subscribe('deletingIndex', () => {
    updateElementInPlace('main-table', renderTableContent);
  });

  return container;
}












