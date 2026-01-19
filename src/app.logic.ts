import { type FeedbackRecord, type FormState } from './types';

export function resetForm(): FormState {
  return {
    orderNumber: '',
    email: '',
    purchaseDate: '',
    shoppingMethod: '',
    supportContacted: 'no',
    rating: {},
    comment: {
      like: '',
      improve: '',
      additional: ''
    }
  };
}

export function isDuplicate(
  records: FeedbackRecord[],
  form: FormState,
  editingId: string | null
): boolean {
  return records.some(r =>
    r.orderNumber === form.orderNumber &&
    r.email === form.email &&
    r.id !== editingId
  );
}