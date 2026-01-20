import * as dom from '../../utils/dom';
import { renderApp } from '.././App';
import { appState, setState, resetForm  } from '../../app.state';

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
    onChange: (e) => {
      const input = e.target as HTMLInputElement;
      setState({
        formData: { ...appState.formData, orderNumber: input.value },
        validationErrors: { ...appState.validationErrors, orderNumber: undefined },
      });
    },
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
  const emailInput = dom.createInput('email', {
    id: 'email',
    name: 'email',
    placeholder: 'your@email.com',
    value: appState.formData.email || '',
    onChange: (e) => {
      const input = e.target as HTMLInputElement;
      setState({
        formData: { ...appState.formData, email: input.value },
        validationErrors: { ...appState.validationErrors, email: undefined },
      });
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
    onChange: (e) => {
      const input = e.target as HTMLInputElement;
      setState({
        formData: { ...appState.formData, purchaseDate: input.value },
        validationErrors: { ...appState.validationErrors, purchaseDate: undefined },
      });
    },
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
          validationErrors: { ...appState.validationErrors, method: undefined },
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