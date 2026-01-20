import * as dom from '../../utils/dom';
import { type RecordData } from '../../types/record';
import { handleView } from './HandleView';
import { handleEdit } from './HandleEdit';
import { handleDelete } from './HandleDelete';

export function renderTableRow(record: RecordData, index: number): HTMLElement {
  const tr = dom.createElement('tr');

  const tdIndex = dom.createElement('td', { text: `${index + 1}.` });
  tr.appendChild(tdIndex);

  const tdOrder = dom.createElement('td', {
    text: record.orderNumber || '',
  });
  tr.appendChild(tdOrder);

  const tdEmail = dom.createElement('td', { text: record.email || '' });
  tr.appendChild(tdEmail);

  const tdDate = dom.createElement('td', {
    text: record.purchaseDate || '',
  });
  tr.appendChild(tdDate);

  const tdMethod = dom.createElement('td', {
    text: record.shoppingMethod || '',
  });
  tr.appendChild(tdMethod);

  const tdActions = dom.createElement('td');
  const actionsDiv = dom.createElement('div', { className: 'table-actions' });

  // View button
  const viewBtn = dom.createButton('👁', {
    className: 'view-btn',
    onClick: () => handleView(index),
  });
  actionsDiv.appendChild(viewBtn);

  // Edit button
  const editBtn = dom.createButton('✎', {
    className: 'edit-btn',
    onClick: () => handleEdit(index),
  });
  actionsDiv.appendChild(editBtn);

  // Delete button
  const deleteBtn = dom.createButton('🗑', {
    className: 'delete-btn',
    onClick: () => handleDelete(index),
  });
  actionsDiv.appendChild(deleteBtn);

  tdActions.appendChild(actionsDiv);
  tr.appendChild(tdActions);

  return tr;
}