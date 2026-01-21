import { getState, setState } from '../../app.state';
import { createElement } from '../../utils/createElement';
import { createInput } from '../../utils/createInput';
import { renderApp } from '.././App';

export function renderRadioGroup(
  name: string,
  label: string,
  options: Array<{ id: string; value: string; label: string }>,
): HTMLElement {
  const group = createElement('div', {
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

  if (getState.validationErrors[name]) {
    group.classList.add('error-field');
  }

  group.appendChild(
    createElement('label', {
      className: 'radio-label',
      children: [
        label,
        createElement('span', { className: 'required', text: '*' }),
      ],
    }),
  );

  const radioContent = createElement('div', { className: 'radio-content' });

  options.forEach(({ id, value, label: optionLabel }) => {
    const span = createElement('span');

    const isChecked =
      getState.formData[fieldName as keyof typeof getState.formData] === value;

    const radio = createInput('radio', {
      id,
      name, 
      value,
      checked: isChecked,
      onChange: (e) => {
        const input = e.target as HTMLInputElement;

        setState({
          formData: {
            ...getState.formData,
            [fieldName]: input.value,
          },
          validationErrors: {
            ...getState.validationErrors,
            [name]: undefined,
          },
        });

        renderApp();
      },
    });

    span.appendChild(radio);
    span.appendChild(
      createElement('label', { text: optionLabel, attributes: { for: id } }),
    );

    radioContent.appendChild(span);
  });

  group.appendChild(radioContent);

  group.appendChild(
    createElement('small', {
      className: getState.validationErrors[name] ? 'error show' : 'error',
      text: 'This is a required field',
    }),
  );

  return group;
}