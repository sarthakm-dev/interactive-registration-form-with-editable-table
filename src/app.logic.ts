import { type RecordData } from './types/record';
import { type ValidationErrors } from './types/validation';
import { STEP_CONFIG } from './config/step.config';
import { isValidEmail } from './services/isValidEmail';
import { isValidOrder } from './services/isValidOrder';
import { isValidDate } from './services/isValidDate';

function radioNameToFormKey(name:string) {
  switch(name) {
    case 'package-content-experience':
      return 'packageContentMatch';
    case 'support-contacted':
      return 'recommendation-experience';
    case 'method':
      return 'shoppingMethod';
    default:
      return name as keyof RecordData;
  }
}

export function validateCurrentStep(
  step: number,
  formData: any,
  ratingData: any
): { valid: boolean; errors: ValidationErrors } {

  const errors: ValidationErrors = {};
  const config = STEP_CONFIG[step];

  if (step === 0) {
    if (!isValidOrder(formData.orderNumber)) {
      errors.orderNumber = true;
    }
    if (!isValidEmail(formData.email)) {
      errors.email = true;
    }
    if (!isValidDate(formData.purchaseDate)) {
      errors.purchaseDate = true;
    }
    if (!formData.shoppingMethod) {
      errors.method = true;
    }
  }

  
  config?.radios?.forEach((name) => {
    const key = radioNameToFormKey(name);

    if (!formData[key]) {
      errors[name] = true;
    }
  });

 
  config?.ratings?.forEach((category) => {
    const isSupportRating = category.startsWith('support-');
    if(isSupportRating && ratingData.supportContacted==='yes'){
      return;
    }
    if (!ratingData[category] || ratingData[category] === 0) {
      errors[category] = true;
    }
  });

  return {
    valid: Object.keys(errors).length === 0,
    errors
  };
}