import { state } from '../app.state';
import { renderApp } from './App';
import { saveToStorage } from '../app.storage';
import { generateId } from '../utils/id';
import { isDuplicate, resetForm } from '../app.logic';

export function Form(): HTMLFormElement {
  const form = document.createElement('form');
  form.className = 'form';

  const order = document.createElement('input');
  order.placeholder = 'Order Number';
  order.value = state.form.orderNumber;

  const email = document.createElement('input');
  email.placeholder = 'Email';
  email.value = state.form.email;

  const submit = document.createElement('button');
  submit.textContent = state.editingId ? 'Update' : 'Submit';

  form.append(order, email, submit);

  form.addEventListener('submit', e => {
    e.preventDefault();

    state.form.orderNumber = order.value.trim();
    state.form.email = email.value.trim();

    if (isDuplicate(state.feedback, state.form, state.editingId)) {
      alert('Duplicate feedback');
      return;
    }

    if (state.editingId) {
      const record = state.feedback.find(r => r.id === state.editingId);
      if (record) Object.assign(record, state.form);
    } else {
      state.feedback.push({
        id: generateId(),
        ...state.form
      });
    }

    state.form = resetForm();
    state.editingId = null;
    saveToStorage();
    renderApp();
  });

  return form;
}