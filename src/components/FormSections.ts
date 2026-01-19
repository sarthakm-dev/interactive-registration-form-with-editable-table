import { state } from '../app.state';
import { Form } from './Form';
import { FORM_FIELDS } from '../form.config';

export function ActiveForm(): HTMLElement {
  const container = document.createElement('div');

  FORM_FIELDS
    .filter(f => f.step === state.step)
    .forEach(field => {
      container.append(renderField(field));
    });

  return container;
}