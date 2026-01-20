import { appState, setState, resetForm } from '../../app.state';

import * as dom from '../../utils/dom';
import { renderApp } from '.././App';

export function renderRadioGroup(
  name: string,
  label: string,
  options: Array<{ id: string; value: string; label: string }>,
): HTMLElement {
  const group = dom.createElement('div', {
    className: 'radio-container',
    attributes: { 'data-radio': name },
  });

  const fieldName =
    name === 'package-content-experience'
      ? 'packageContentMatch'
      : name === 'support-contacted'
      ? 'supportContacted'
      : name === 'recommendation-experience'
      ? 'recommendToFriends'
      : name;

  if (appState.validationErrors[name]) {
    group.classList.add('error-field');
  }

  group.appendChild(
    dom.createElement('label', {
      className: 'radio-label',
      children: [
        label,
        dom.createElement('span', { className: 'required', text: '*' }),
      ],
    }),
  );

  const radioContent = dom.createElement('div', { className: 'radio-content' });

  options.forEach(({ id, value, label: optionLabel }) => {
    const span = dom.createElement('span');

    const isChecked =
      appState.formData[fieldName as keyof typeof appState.formData] === value;

    const radio = dom.createInput('radio', {
      id,
      name, 
      value,
      checked: isChecked,
      onChange: (e) => {
        const input = e.target as HTMLInputElement;

        setState({
          formData: {
            ...appState.formData,
            [fieldName]: input.value,
          },
          validationErrors: {
            ...appState.validationErrors,
            [name]: undefined,
          },
        });

        renderApp();
      },
    });

    span.appendChild(radio);
    span.appendChild(
      dom.createElement('label', { text: optionLabel, attributes: { for: id } }),
    );

    radioContent.appendChild(span);
  });

  group.appendChild(radioContent);

  group.appendChild(
    dom.createElement('small', {
      className: appState.validationErrors[name] ? 'error show' : 'error',
      text: 'This is a required field',
    }),
  );

  return group;
}