import { getState } from '../app.state';
import { createElement } from '../utils/createElement';
import { renderTableRow } from './table/TableRow';


export function Table(): HTMLElement {
  const container = createElement('div', { className: 'table-panel' });

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

  container.appendChild(table);
  return container;
}











