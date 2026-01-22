import { type RecordData } from '../types/record';
import { type RatingMap } from '../types/rating';
import { type ValidationErrors } from '../types/validation';
import { isValidDate } from './isValidDate';
import { isValidEmail } from './isValidEmail';
import { isValidOrder } from './isValidOrder';

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
    errors['orderNumber'] = true;
  }

  if (!formData.email || !isValidEmail(formData.email)) {
    errors['email'] = true;
  }

  if (!formData.purchaseDate || !isValidDate(formData.purchaseDate)) {
    errors['purchaseDate'] = true;
  }

  if (!formData.shoppingMethod) {
    errors['method'] = true;
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
      errors[cat] = true;
    }
  });

  // Delivery experience follow-up
  if (!formData.packageContentMatch) {
    errors['package-content-experience'] = true;
  }

  // Support question
  if (!formData.supportContacted) {
    errors['support-contacted'] = true;
  }

  // If support was contacted, validate support ratings
  if (formData.supportContacted === 'yes') {
    if (ratingData['support-responsiveness'] === 0 || ratingData['support-responsiveness'] === undefined) {
      errors['support-responsiveness'] = true;
    }
    if (ratingData['support-helpfulness'] === 0 || ratingData['support-helpfulness'] === undefined) {
      errors['support-helpfulness'] = true;
    }
  }

  // Recommendation question
  if (!formData.recommendToFriend) {
    errors['recommendation-experience'] = true;
  }

  // Check for duplicate
  const isDuplicate = checkDuplicateRecord(formData, records, editingIndex);
  if (isDuplicate) {
    errors['duplicate'] = true;
    alert("Order Number and Email already exists");
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}