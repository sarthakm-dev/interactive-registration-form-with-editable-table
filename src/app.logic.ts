import { type RecordData } from './types/record';
import { type ValidationErrors } from './types/validation';
import { STEP_CONFIG } from './config/step.config';
import { isValidEmail } from './utils/isValidEmail';
import { isValidOrder } from './utils/isValidOrder';
import { isValidDate } from './utils/isValidDate';

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
      errors.orderNumber = "Invalid Order Number";
    }
    if (!isValidEmail(formData.email)) {
      errors.email = "Invalid Email";
    }
    if (!isValidDate(formData.purchaseDate)) {
      errors.purchaseDate = "Date is a Required Field";
    }
    if (!formData.shoppingMethod) {
      errors.method = "This is a required field";
    }
  }

  
  config?.radios?.forEach((name) => {
    const key = radioNameToFormKey(name);

    if (!formData[key]) {
      errors[name] = "THis is a required field";
    }
  });

 
  config?.ratings?.forEach((category) => {
    const isSupportRating = category.startsWith('support-');
    if(isSupportRating && ratingData.supportContacted==='yes'){
      return;
    }
    if (!ratingData[category] || ratingData[category] === 0) {
      errors[category] = "This is a required field";
    }
  });

  return {
    valid: Object.keys(errors).length === 0,
    errors
  };
}