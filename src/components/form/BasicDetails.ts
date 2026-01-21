import * as dom from '../../utils/dom';
import { renderApp } from '.././App';
import { appState, setState } from '../../app.state';
import { isValidDate, isValidEmail, isValidOrder } from '../../app.logic';

export function renderBasicDetails(): HTMLElement {
  const section = dom.createElement('div', { attributes: { id: 'product-details' } });

  // Personal details
  const personalDetails = dom.createElement('div', { className: 'personal-details' });

  // Order number
  const orderDiv = dom.createElement('div', { className: 'order-details' });
  if (appState.validationErrors['orderNumber']) {
    orderDiv.classList.add('error-field');
  }
  orderDiv.appendChild(
    dom.createElement('label', {
      className: 'text-label',
      children: [
        'Order Number:',
        dom.createElement('span', { className: 'required', text: '*' }),
      ],
    }),
  );

  const orderInput = dom.createInput('text', {
    id: 'product-name',
    name: 'product-name',
    placeholder: 'e.g. ORD-123456',
    value: appState.formData.orderNumber || '',
    onInput: (e) => {
      const input = e.target as HTMLInputElement;
      const value = (e.target as HTMLInputElement).value;

      const isInvalid = !isValidOrder(value);

      setState({
        formData: { ...appState.formData, orderNumber: value },
        validationErrors: {
          ...appState.validationErrors,
          orderNumber: isInvalid ? true : undefined,
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
          ...appState.validationErrors,
          orderNumber: !isValidOrder(value) ? true : undefined,
        },
      });
      renderApp();
    },
    /*onChange: (e) => {
      const input = e.target as HTMLInputElement;
      setState({
        formData: { ...appState.formData, orderNumber: input.value },
        validationErrors: { ...appState.validationErrors },
      });
    }*/
  });
  orderDiv.appendChild(orderInput);
  orderDiv.appendChild(
    dom.createElement('small', {
      className: appState.validationErrors['orderNumber'] ? 'error show' : 'error',
      text: 'Enter in ORD-XXXXXX format'
    }),
  );
  personalDetails.appendChild(orderDiv);

  // Email
  const emailDiv = dom.createElement('div', { className: 'order-details' });
  if (appState.validationErrors['email']) {
    emailDiv.classList.add('error-field');
  }
  emailDiv.appendChild(
    dom.createElement('label', {
      className: 'text-label',
      children: [
        'Email:',
        dom.createElement('span', { className: 'required', text: '*' }),
      ],
    }),
  );
  const emailInput = dom.createInput('text', {
    id: 'email',
    name: 'email',
    placeholder: 'your@email.com',
    value: appState.formData.email || '',
    onInput: (e) => {
      const input = (e.target as HTMLInputElement);
      const value = (e.target as HTMLInputElement).value;
      setState({
        formData: { ...appState.formData, email: value },
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
          ...appState.validationErrors,
          email: !isValidEmail(value) ? true : undefined,
        },
      });
      renderApp();
    },
  });
  emailDiv.appendChild(emailInput);
  emailDiv.appendChild(
    dom.createElement('small', {
      className: appState.validationErrors['email'] ? 'error show' : 'error',
      text: 'Enter a valid email id'
    }),
  );
  personalDetails.appendChild(emailDiv);

  section.appendChild(personalDetails);

  // Purchase date
  const dateDiv = dom.createElement('div', { className: 'date-details' });
  if (appState.validationErrors['purchaseDate']) {
    dateDiv.classList.add('error-field');
  }
  dateDiv.appendChild(
    dom.createElement('label', {
      className: 'text-label',
      children: [
        'Purchase Date:',
        dom.createElement('span', { className: 'required', text: '*' }),
      ],
    }),
  );
  const dateInput = dom.createInput('date', {
    id: 'purchase-date',
    name: 'purchase-date',
    value: appState.formData.purchaseDate || '',
    attributes: { max: new Date().toISOString().split('T')[0] },
    onInput: (e) => {
      const input = (e.target as HTMLInputElement);
      const value = (e.target as HTMLInputElement).value;
      setState({
        formData: { ...appState.formData, purchaseDate: value },
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
          ...appState.validationErrors,
          purchaseDate: !isValidDate(value) ? true : undefined,
        },
      });
      renderApp();
    }
  });
  dateDiv.appendChild(dateInput);
  dateDiv.appendChild(
    dom.createElement('small', {
      className: appState.validationErrors['purchaseDate'] ? 'error show' : 'error',
      text: 'This is a required field'
    }),
  );
  section.appendChild(dateDiv);

  // Shopping method radio
  const methodDiv = dom.createElement('div', {
    className: 'radio-container',
    attributes: { 'data-radio': 'method', id: 'main-radio-container' },
  });

  if (appState.validationErrors['method']) {
    methodDiv.classList.add('error-field');
  }

  methodDiv.appendChild(
    dom.createElement('label', {
      className: 'main-radio-label',
      children: [
        'Shopping Method',
        dom.createElement('span', { className: 'required', text: '*' }),
      ],
    }),
  );

  const radioContent = dom.createElement('div', { className: 'radio-content' });
  ['online', 'offline'].forEach((method) => {
    const radioRow = dom.createElement('div', { className: 'radio-row' });
    const radio = dom.createInput('radio', {
      name: 'method',
      id: method,
      value: method === 'online' ? 'Online' : 'Offline',
      checked: appState.formData.shoppingMethod === (method === 'online' ? 'Online' : 'Offline'),
      onChange: (e) => {
        const input = e.target as HTMLInputElement;
        setState({
          formData: { ...appState.formData, shoppingMethod: input.value },
          validationErrors: { ...appState.validationErrors },
        });
        renderApp();
      },
    });
    radioRow.appendChild(radio);
    const label = dom.createElement('label', {
      text: method === 'online' ? 'Online (Website)' : 'Offline (Stores)',
      attributes: { for: method },
    });
    radioRow.appendChild(label);
    radioContent.appendChild(radioRow);
  });

  methodDiv.appendChild(radioContent);

  const methodError = dom.createElement('small', {
    className: appState.validationErrors['method'] ? 'error show' : 'error',
    text: 'This is a required field'
  });
  methodDiv.appendChild(methodError);
  section.appendChild(methodDiv);

  return section;
}