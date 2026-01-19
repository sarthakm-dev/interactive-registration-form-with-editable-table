import { state } from '../app.state';
import { FORM_FIELDS } from '../form.config';
import { validateField } from '../app.logic';
import { renderApp } from './App';
import { Field } from './ui/Field';
import { Rating } from './Rating';
import { submitForm, canSubmit } from '../app.logic';
import { Button } from './ui/Button';
import { Stepper } from './Stepper';

export function Form(): HTMLDivElement {
  const form = document.createElement('div');
  form.className = 'card';

  FORM_FIELDS
    .filter(f => f.step === state.step)
    .forEach(field => {
      const input =
        field.type === 'textarea'
          ? document.createElement('textarea')
          : document.createElement('input');

      if (input instanceof HTMLInputElement) {
        input.type = field.type;
      }

      input.value = state.form.values[field.key] ?? '';

      input.oninput = () => {
        state.form.values[field.key] = input.value;
      };

      input.onblur = () => {
        state.form.touched[field.key] = true;
        state.form.errors[field.key] =
          validateField(field.key, input.value) ?? undefined;
        renderApp();
      };

      form.appendChild(
        Field(
          field.label,
          input,
          state.form.touched[field.key]
            ? state.form.errors[field.key]
            : undefined
        )
      );
    });
  if (state.step === 1) {
    form.appendChild(Rating('productQuality', 'Product Quality'));
    form.appendChild(Rating('deliveryExperience', 'Delivery Experience'));
    form.appendChild(Rating('supportExperience', 'Support Experience'));
  }
  form.appendChild(Stepper());

if (state.step === 1) {
  form.appendChild(
    Button(
      state.editingId ? 'Update Feedback' : 'Submit Feedback',
      () => {
        if (canSubmit()) submitForm();
        renderApp();
      }
    )
  );
}

  return form;
}