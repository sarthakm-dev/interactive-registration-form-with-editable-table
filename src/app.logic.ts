import { type FieldKey } from './types';
import { state } from './app.state';
import { type FeedbackRecord } from './types';


type Validator = (v: string) => string | null;

const validators: Partial<Record<FieldKey, Validator>> = {
  orderNumber: v =>
    /^ORD-\d{6}$/.test(v) ? null : 'Invalid order number',

  email: v =>
    /^\S+@\S+\.\S+$/.test(v) ? null : 'Invalid email',

  purchaseDate: v =>
    v ? null : 'Purchase date is required'
};

export function validateField(
  key: FieldKey,
  value: string
): string | null {
  return validators[key]?.(value) ?? null;
}


export function canSubmit(): boolean {
  return Object.values(state.form.errors).every(e => !e);
}

export function submitForm(): void {
  const record: FeedbackRecord = {
    id: crypto.randomUUID(),
    values: { ...state.form.values }
  };

  if (state.editingId) {
    const index = state.feedback.findIndex(r => r.id === state.editingId);
    state.feedback[index] = record;
    state.editingId = null;
  } else {
    state.feedback.push(record);
  }

  resetForm();
}

export function resetForm(): void {
  Object.keys(state.form.values).forEach(
    k => (state.form.values[k as keyof typeof state.form.values] = '')
  );

  state.form.errors = {};
  state.form.touched = {};
  state.step = 0;
}