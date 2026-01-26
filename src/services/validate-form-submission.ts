import { type RecordData } from '../types/record';
import { type RatingMap } from '../types/rating';
import { type ValidationErrors } from '../types/validation';
import { isValidDate } from '../utils/is-valid-date';
import { isValidEmail } from '../utils/is-valid-email';
import { isValidOrder } from '../utils/is-valid-order';
import { setState } from '../core/state';
import { renderApp } from '../components';

function checkDuplicateRecord(
  formData: Partial<RecordData>,
  records: RecordData[],
  editingIndex: number | null,
): boolean {
  return records.some((record, index) => {
    if (editingIndex !== null && index === editingIndex) {
      return false;
    }
    return record.orderNumber === formData.orderNumber && record.email === formData.email;
  });
}
export function validateFormForSubmission(
  formData: Partial<RecordData>,
  ratingData: RatingMap,
  records: RecordData[],
  editingIndex: number | null,
): { valid: boolean; errors: ValidationErrors } {
  const errors: ValidationErrors = {};

  // Basic details validation
  if (!formData.orderNumber || !isValidOrder(formData.orderNumber)) {
    errors['orderNumber'] = "Invalid Order Number";
  }

  if (!formData.email || !isValidEmail(formData.email)) {
    errors['email'] = "Invalid Email";
  }

  if (!formData.purchaseDate || !isValidDate(formData.purchaseDate)) {
    errors['purchaseDate'] = "Invalid Purchase Date";
  }

  if (!formData.shoppingMethod) {
    errors['method'] = "Invalid Shopping Method";
  }

  // All ratings must be filled
  const requiredRatings = [
    'product-quality',
    'matches-description',
    'durability',
    'value-for-money',
    'websites-ease-of-use',
    'product-search',
    'checkout-process',
    'payment-options',
    'delivery-experience',
    'delivery-speed',
    'packaging-quality',
  ];

  requiredRatings.forEach((cat) => {
    if (ratingData[cat] === 0 || ratingData[cat] === undefined) {
      errors[cat] = "Requird Field";
    }
  });

  // Delivery experience follow-up
  if (!formData.packageContentMatch) {
    errors['package-content-experience'] = "REquired Field";
  }

  // Support question
  if (!formData.supportContacted) {
    errors['support-contacted'] = "Required Field";
  }

  // If support was contacted, validate support ratings
  if (formData.supportContacted === 'yes') {
    if (ratingData['support-responsiveness'] === 0 || ratingData['support-responsiveness'] === undefined) {
      errors['support-responsiveness'] = "Required Field";
    }
    if (ratingData['support-helpfulness'] === 0 || ratingData['support-helpfulness'] === undefined) {
      errors['support-helpfulness'] = "Required Field";
    }
  }

  // Recommendation question
  if (!formData.recommendToFriend) {
    errors['recommendation-experience'] = "Required Field";
  }

  // Check for duplicate
  const isDuplicate = checkDuplicateRecord(formData, records, editingIndex);
  if (isDuplicate) {
    errors['duplicate'] = "Duplicate Entry";
    setState({showDuplicateModal:true});
    renderApp();
    
  }
  
  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}