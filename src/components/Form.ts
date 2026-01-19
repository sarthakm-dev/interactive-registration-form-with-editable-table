import { state } from '../app.state';
import { FORM_FIELDS } from '../form.config';
import { validateField } from '../app.logic';
import { renderApp } from './App';
import { Field } from './ui/Field';
import { Rating } from './Rating';
import { submitForm, canSubmit } from '../app.logic';
import { Button } from './ui/Button';
import { Stepper } from './Stepper';
import { type FieldKey } from '../types';
export function Form(keys: FieldKey[]): HTMLFormElement {
  const form = document.createElement('form');

  FORM_FIELDS
    .filter(f => keys.includes(f.key))
    .forEach(field => {
      const wrapper = document.createElement('div');
      wrapper.className = 'field';

      const label = document.createElement('label');

      label.className = 'field-label';
      label.textContent = field.label;

      const input =
        field.type === 'textarea'
          ? document.createElement('textarea')
          : document.createElement('input');

      input.value = state.form.values[field.key] ?? '';

      input.addEventListener('input', () => {
        state.form.values[field.key] = input.value;
      });

      wrapper.append(label, input);
      form.appendChild(wrapper);
    });

  return form;
}