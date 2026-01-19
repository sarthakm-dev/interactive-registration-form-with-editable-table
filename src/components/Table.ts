import { state } from '../app.state';
import { renderApp } from './App';
import { saveToStorage } from '../app.storage';

export function Table(): HTMLTableElement {
  const table = document.createElement('table');
  table.className = 'table';

  state.feedback.forEach(record => {
    const row = document.createElement('tr');

    const order = document.createElement('td');
    order.textContent = record.orderNumber;

    const email = document.createElement('td');
    email.textContent = record.email;

    const edit = document.createElement('button');
    edit.textContent = 'Edit';
    edit.onclick = () => {
      state.editingId = record.id;
      state.form = { ...record };
      renderApp();
    };

    const del = document.createElement('button');
    del.textContent = 'Delete';
    del.onclick = () => {
      state.feedback = state.feedback.filter(r => r.id !== record.id);
      saveToStorage();
      renderApp();
    };

    const actions = document.createElement('td');
    actions.append(edit, del);

    row.append(order, email, actions);
    table.appendChild(row);
  });

  return table;
}