import { type AppState } from './types';

export const state: AppState = {
  theme: 'light',
  step: 0,
  editingId: null,
  feedback: [],
  form: {
    values: {
      orderNumber: '',
      email: '',
      purchaseDate: '',
      shoppingMethod: '',
      supportContacted: 'no',

      productQuality: '',
      deliveryExperience: '',
      supportExperience: '',

      like: '',
      improve: '',
      additional: ''
    },
    errors: {},
    touched: {}
  }
};