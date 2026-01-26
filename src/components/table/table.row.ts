import { type RecordData } from '../../types/record';
import { handleView } from './table.view';
import { handleEdit } from './table.edit';
import { handleDelete } from './table.delete';
import { createElement } from '../../ui/create-element';
import { createButton } from '../../ui/create-button';

export function renderTableRow(record: RecordData, index: number): HTMLElement {
  const tr = createElement('tr');

  const tdIndex = createElement('td', { text: `${index + 1}.` });
  tr.appendChild(tdIndex);

  const tdOrder = createElement('td', {
    text: record.orderNumber || '',
  });
  tr.appendChild(tdOrder);

  const tdEmail = createElement('td', { text: record.email || '' });
  tr.appendChild(tdEmail);

  const tdDate = createElement('td', {
    text: record.purchaseDate || '',
  });
  tr.appendChild(tdDate);

  const tdMethod = createElement('td', {
    text: record.shoppingMethod || '',
  });
  tr.appendChild(tdMethod);

  const tdActions = createElement('td');
  const actionsDiv = createElement('div', { className: 'table-actions' });

  // View button
  const viewBtn = createButton('👁', {
    className: 'view-btn',
    onClick: () => handleView(index),
  });
  actionsDiv.appendChild(viewBtn);

  // Edit button
  const editBtn = createButton('✎', {
    className: 'edit-btn',
    onClick: () => handleEdit(index),
  });
  actionsDiv.appendChild(editBtn);

  // Delete button
  const deleteBtn = createButton('🗑', {
    className: 'delete-btn',
    onClick: () => handleDelete(index),
  });
  actionsDiv.appendChild(deleteBtn);

  tdActions.appendChild(actionsDiv);
  tr.appendChild(tdActions);

  return tr;
}

