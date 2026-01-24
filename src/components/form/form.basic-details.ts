import { getState, setState } from '../../app.state';
import { createElement } from '../../ui/createElement';
import { isValidDate } from '../../utils/isValidDate';
import { renderApp } from '..';
import { isValidEmail } from '../../utils/isValidEmail';
import { isValidOrder } from '../../utils/isValidOrder';
import { createInput } from '../../ui/createInput';

export function renderBasicDetails(): HTMLElement {
  const section = createElement('div', { attributes: { id: 'product-details' } });

  // Personal details
  const personalDetails = createElement('div', { className: 'personal-details' });

  // Order number
  const orderDiv = createElement('div', { className: 'order-details' });
  if (getState.validationErrors['orderNumber']) {
    orderDiv.classList.add('error-field');
  }
  orderDiv.appendChild(
    createElement('label', {
      className: 'text-label',
      children: [
        'Order Number:',
        createElement('span', { className: 'required', text: '*' }),
      ],
    }),
  );

  const orderInput = createInput('text', {
    id: 'order-input',
    name: 'order-input',
    placeholder: 'e.g. ORD-123456',
    value: getState.formData.orderNumber || '',
    onInput: (e) => {
      const input = e.target as HTMLInputElement;
      const value = (e.target as HTMLInputElement).value;

      const isInvalid = !isValidOrder(value);

      setState({
        formData: { ...getState.formData, orderNumber: value },
        validationErrors: {
          ...getState.validationErrors,
          orderNumber: isInvalid ? 'Invalid Order' : '',
        },
      });
      const wrapper = input.closest('.order-details');
      wrapper?.classList.remove('error-field');
      const errorEl = wrapper?.querySelector('.error');
      errorEl?.classList.remove('show');
    },

    onBlur: (e) => {
      const value = (e.target as HTMLInputElement).value;

      setState({
        validationErrors: {
          ...getState.validationErrors,
          orderNumber: !isValidOrder(value) ? 'Invalid Order' : '',
        },
      });
      renderApp();
    },
    
  });
  orderDiv.appendChild(orderInput);
  orderDiv.appendChild(
    createElement('small', {
      className: getState.validationErrors['orderNumber'] ? 'error show' : 'error',
      text: 'Enter in ORD-XXXXXX format'
    }),
  );
  personalDetails.appendChild(orderDiv);

  // Email
  const emailDiv = createElement('div', { className: 'order-details' });
  if (getState.validationErrors['email']) {
    emailDiv.classList.add('error-field');
  }
  emailDiv.appendChild(
    createElement('label', {
      className: 'text-label',
      children: [
        'Email:',
        createElement('span', { className: 'required', text: '*' }),
      ],
    }),
  );

  const emailInput = createInput('text', {
    id: 'email',
    name: 'email',
    placeholder: 'your@email.com',
    value: getState.formData.email || '',
    onInput: (e) => {
      const input = (e.target as HTMLInputElement);
      const value = (e.target as HTMLInputElement).value;
      setState({
        formData: { ...getState.formData, email: value },
      });
      const wrapper = input.closest('.order-details');
      wrapper?.classList.remove('error-field');
      const errorEl = wrapper?.querySelector('.error');
      errorEl?.classList.remove('show');
    },
    onBlur: (e) => {
      const value = (e.target as HTMLInputElement).value;
      setState({
        validationErrors: {
          ...getState.validationErrors,
          email: !isValidEmail(value) ? "Invalid Email" : '',
        },
      });
      renderApp();
    },
  });

  emailDiv.appendChild(emailInput);

  emailDiv.appendChild(
    createElement('small', {
      className: getState.validationErrors['email'] ? 'error show' : 'error',
      text: 'Enter a valid email id'
    }),
  );

  personalDetails.appendChild(emailDiv);
  

  section.appendChild(personalDetails);

  // Purchase date
  const dateDiv = createElement('div', { className: 'date-details' });
  if (getState.validationErrors['purchaseDate']) {
    dateDiv.classList.add('error-field');
  }

  dateDiv.appendChild(
    createElement('label', {
      className: 'text-label',
      children: [
        'Purchase Date:',
        createElement('span', { className: 'required', text: '*' }),
      ],
    }),
  );

  const dateInput = createInput('date', {
    id: 'purchase-date',
    name: 'purchase-date',
    value: getState.formData.purchaseDate || '',
    attributes: { max: new Date().toISOString().split('T')[0] },
    onInput: (e) => {
      const input = (e.target as HTMLInputElement);
      const value = (e.target as HTMLInputElement).value;
      setState({
        formData: { ...getState.formData, purchaseDate: value },
      });
      const wrapper = input.closest('.order-details');
      wrapper?.classList.remove('error-field');
      const errorEl = wrapper?.querySelector('.error');
      errorEl?.classList.remove('show');
    },
    onBlur: (e) => {
      const value = (e.target as HTMLInputElement).value;
      setState({
        validationErrors: {
          ...getState.validationErrors,
          purchaseDate: !isValidDate(value) ? 'Invalid Date' : '',
        },
      });
      renderApp();
    }
  });

  dateDiv.appendChild(dateInput);

  dateDiv.appendChild(
    createElement('small', {
      className: getState.validationErrors['purchaseDate'] ? 'error show' : 'error',
      text: 'This is a required field'
    }),
  );
  section.appendChild(dateDiv);

  // Shopping method radio
  const methodDiv = createElement('div', {
    className: 'radio-container',
    attributes: { 'data-radio': 'method', id: 'main-radio-container' },
  });

  if (getState.validationErrors['method']) {
    methodDiv.classList.add('error-field');
  }

  methodDiv.appendChild(
    createElement('label', {
      className: 'main-radio-label',
      children: [
        'Shopping Method',
        createElement('span', { className: 'required', text: '*' }),
      ],
    }),
  );

  const radioContent = createElement('div', { className: 'radio-content' });
  ['online', 'offline'].forEach((method) => {
    const radioRow = createElement('div', { className: 'radio-row' });
    const radio = createInput('radio', {
      name: 'method',
      id: method,
      value: method === 'online' ? 'Online' : 'Offline',
      checked: getState.formData.shoppingMethod === (method === 'online' ? 'Online' : 'Offline'),
      onChange: (e) => {
        const input = e.target as HTMLInputElement;
        setState({
          formData: { ...getState.formData, shoppingMethod: input.value },
          validationErrors: { ...getState.validationErrors,method:'' },
        });
        renderApp();
      },
    });
    
    radioRow.appendChild(radio);
    const label = createElement('label', {
      text: method === 'online' ? 'Online (Website)' : 'Offline (Stores)',
      attributes: { for: method },
    });
    radioRow.appendChild(label);
    radioContent.appendChild(radioRow);
  });

  methodDiv.appendChild(radioContent);

  const methodError = createElement('small', {
    className: getState.validationErrors['method'] ? 'error show' : 'error',
    text: 'This is a required field'
  });
  methodDiv.appendChild(methodError);
  section.appendChild(methodDiv);

  return section;
}