import { getState, setState } from '../../core/state';
import { createElement } from '../../ui/create-element';
import { createInput } from '../../ui/create-input';


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
      ? 'recommendToFriend'
      : name;

  
  const validationErrorKey =
    name === 'package-content-experience'
      ? 'packageContentMatch'
      : name;

  if (getState.validationErrors[validationErrorKey]) {
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
            [validationErrorKey]: '',
          },
        });
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
      className: getState.validationErrors[validationErrorKey] ? 'error show' : 'error',
      text: 'This is a required field',
    }),
  );

  return group;
}