import { type FieldKey } from './types';

export interface FieldConfig {
  key: FieldKey;
  label: string;
  type: 'text' | 'email' | 'date' | 'textarea';
  step: number;
}

export const FORM_FIELDS: FieldConfig[] = [
  { key: 'orderNumber', label: 'Order Number', type: 'text', step: 0 },
  { key: 'email', label: 'Email', type: 'email', step: 0 },
  { key: 'purchaseDate', label: 'Purchase Date', type: 'date', step: 0 },

  { key: 'like', label: 'What did you like?', type: 'textarea', step: 1 },
  { key: 'improve', label: 'What can we improve?', type: 'textarea', step: 1 },
  { key: 'additional', label: 'Additional comments', type: 'textarea', step: 1 }
];