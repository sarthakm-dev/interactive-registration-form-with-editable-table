import { appState } from '../app.state';
import * as dom from '../utils/dom';
import { renderTableRow } from './table/TableRow';


export function Table(): HTMLElement {
  const container = dom.createElement('div', { className: 'table-panel' });

  const table = dom.createElement('table', {
    className: 'data-table',
    attributes: { id: 'main-table' },
  });

  // Create thead
  const thead = dom.createElement('thead');
  const headerRow = dom.createElement('tr');
  const headers = ['#', 'Order', 'Email', 'Purchase', 'Method', 'Actions'];
  headers.forEach((header) => {
    const th = dom.createElement('th', { text: header });
    headerRow.appendChild(th);
  });
  thead.appendChild(headerRow);
  table.appendChild(thead);

  // Create tbody
  const tbody = dom.createElement('tbody');
  appState.records.forEach((record, index) => {
    const tr = renderTableRow(record, index);
    tbody.appendChild(tr);
  });
  table.appendChild(tbody);

  container.appendChild(table);
  return container;
}











