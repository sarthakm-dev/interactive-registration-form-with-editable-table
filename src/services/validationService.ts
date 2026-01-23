import { VALIDATION_CONFIG } from '../config/validation.config';
import { type RatingMap } from '../types/rating';
import { type ValidationErrors } from '../types/validation';

export function validateStep(
  step: number,
  formData: any,
  ratingData: RatingMap,
): { valid: boolean; errors: ValidationErrors } {
  const errors: ValidationErrors = {};
  const config = VALIDATION_CONFIG[step];

  if (!config) return { valid: true, errors };

  for (const field in config) {
    const rules = config[field];
    
    for (const rule of rules) {
      switch (rule.type) {
        case 'required': {
            console.log(formData[field]);
          if (!formData[field]) {
            errors[field] = rule.message;
          }
          break;
        }

        case 'pattern': {
          if (!rule.pattern.test(formData[field] || '')) {
            errors[field] = rule.message;
          }
          break;
        }

        case 'rating-required': {
          if (!ratingData[field] || ratingData[field] === 0) {
            errors[field] = rule.message;
          }
          break;
        }

        case 'conditional-required': {
          if (
            formData[rule.dependsOn] === rule.value &&
            (!ratingData[field] || ratingData[field] === 0)
          ) {
            errors[field] = rule.message;
          }
          break;
        }
      }

      
      if (errors[field]) break;
    }
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}