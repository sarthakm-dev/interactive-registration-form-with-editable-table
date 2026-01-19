import { state } from '../app.state';
import { renderApp } from './App';

export function Table(): HTMLTableElement {
  const table = document.createElement('table');
  table.className = 'table';

  state.feedback.forEach((r, index) => {
    const row = document.createElement('tr');

    const order = document.createElement('td');
    order.textContent = r.values.orderNumber;

    const email = document.createElement('td');
    email.textContent = r.values.email;

    const actions = document.createElement('td');

    const edit = document.createElement('button');
    edit.textContent = 'Edit';
    edit.onclick = () => {
      state.form.values = { ...r.values };
      state.editingId = r.id;
      state.step = 0;
      renderApp();
    };

    const del = document.createElement('button');
    del.textContent = 'Delete';
    del.onclick = () => {
      state.feedback.splice(index, 1);
      renderApp();
    };

    actions.append(edit, del);
    row.append(order, email, actions);
    table.appendChild(row);
  });

  return table;
}