import { type RecordData } from './types/record';
import { type RatingValue } from './types/ratings';
import { type RatingMap } from './types/ratings';
import { type ValidationErrors } from './types/validation';
//Validation Logic

const EMAIL_REGEX = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
const ORDER_REGEX = /^ORD-\d{6}$/;

export function isValidEmail(v: string | null): boolean {
  return !!v && EMAIL_REGEX.test(v);
}

export function isValidOrder(v: string | null): boolean {
  return !!v && ORDER_REGEX.test(v);
}

export function isValidDate(v: string | null): boolean {
  return !!v && v.trim() !== '';
}

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

export function validateRadioGroup(
  radioName: string,
  selectedValue: string | null,
): boolean {
  return selectedValue !== null && selectedValue.trim().length > 0;
}

export function validateRatingsForStep(
  currentStep: number,
  ratingData: RatingMap,
  supportContacted: string | null,
): boolean {
  const stepConfig = STEP_CONFIG;
  const config = stepConfig[currentStep];
  if (!config) return false;

  return config.ratings.every((category) => {
    const isConditional = category.includes('support-') && supportContacted === 'no';
    if (isConditional) return true;
    return ratingData[category] > 0;
  });
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
  if (!formData.recommendToFriends) {
    errors['recommendation-experience'] = true;
  }

  // Check for duplicate
  const isDuplicate = checkDuplicateRecord(formData, records, editingIndex);
  if (isDuplicate) {
    errors['duplicate'] = true;
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

// Record Operations

export function createRecordFromFormData(
  formData: Partial<RecordData>,
  ratingData: RatingMap,
): RecordData {
  return {
    orderNumber: formData.orderNumber || null,
    email: formData.email || null,
    purchaseDate: formData.purchaseDate || null,
    shoppingMethod: formData.shoppingMethod || null,
    packageContentMatch: formData.packageContentMatch || null,
    supportContacted: formData.supportContacted || null,
    recommendToFriends: formData.recommendToFriends || null,
    whatDidYouLike: formData.whatDidYouLike || null,
    whatToImprove: formData.whatToImprove || null,
    additionalComments: formData.additionalComments || null,
    participateInMonthlyReview: formData.participateInMonthlyReview || 'no',
    ratings: { ...ratingData },
  };
}

export function updateRecordInList(
  records: RecordData[],
  index: number,
  updatedRecord: RecordData,
): RecordData[] {
  const newRecords = [...records];
  newRecords[index] = updatedRecord;
  return newRecords;
}

export function deleteRecordFromList(records: RecordData[], index: number): RecordData[] {
  return records.filter((_, i) => i !== index);
}

export function addRecordToList(records: RecordData[], record: RecordData): RecordData[] {
  return [...records, record];
}

export function checkDuplicateRecord(
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

// Stepper Logic

export const STEP_CONFIG = [
  {
    // Step 0
    fields: ['orderNumber', 'email', 'purchaseDate', 'method'],
    ratings: [
      'product-quality',
      'matches-description',
      'durability',
      'value-for-money'
    ]
  },
  {
    // Step 1
    ratings: [
      'websites-ease-of-use',
      'product-search',
      'checkout-process',
      'payment-options'
    ],
    
  },
  {
    // Step 2
     ratings: [
      'delivery-experience',
      'delivery-speed',
      'packaging-quality'
    ],
    radios: ['package-content-experience']
  },
  {
    // Step 3
    ratings: [
    ],
    radios: ['support-contacted', 'recommendation-experience']
  }
];

export function getNextStep(
  currentStep: number,
  maxSteps: number = 4,
): number {
  return Math.min(currentStep + 1, maxSteps - 1);
}

export function getPreviousStep(currentStep: number): number {
  return Math.max(currentStep - 1, 0);
}

export function canGoToNextStep(
  currentStep: number,
  ratingData: RatingMap,
  supportContacted: string | null,
  requiredRadios: Record<number, string[]>,
): boolean {
  const radios = requiredRadios[currentStep] || [];
  
  // Validate step-specific radios
  for (const radioName of radios) {
    const isValid = validateStepRadio(radioName, supportContacted);
    if (!isValid) return false;
  }

  // Validate ratings for this step
  return validateRatingsForStep(currentStep, ratingData, supportContacted);
}

function validateStepRadio(radioName: string, supportContacted: string | null): boolean {
  if (radioName === 'support-contacted') {
    return supportContacted !== null;
  }
  return true;
}

// Rating Logic

export function updateRating(
  ratingData: RatingMap,
  category: string,
  value: RatingValue,
): RatingMap {
  return {
    ...ratingData,
    [category]: value,
  };
}

export function getAverageRating(ratingData: RatingMap): number {
  const ratings = Object.values(ratingData).filter((v) => v > 0);
  if (ratings.length === 0) return 0;
  const sum = ratings.reduce((acc, val) => acc + (val as number), 0 as number);
  return sum / ratings.length;
}

// Conditional Logic

export function isSupportSectionVisible(supportContacted: string | null): boolean {
  return supportContacted === 'yes';
}

export function getRequiredRadiosByStep(): Record<number, string[]> {
  return {
    0: ['method'],
    2: ['package-content-experience'],
    3: ['support-contacted', 'recommendation-experience'],
  };
}


// Populate Form

export function populateFormDataFromRecord(record: RecordData): Partial<RecordData> {
  return {
    orderNumber: record.orderNumber,
    email: record.email,
    purchaseDate: record.purchaseDate,
    shoppingMethod: record.shoppingMethod,
    packageContentMatch: record.packageContentMatch,
    supportContacted: record.supportContacted,
    recommendToFriends: record.recommendToFriends,
    whatDidYouLike: record.whatDidYouLike,
    whatToImprove: record.whatToImprove,
    additionalComments: record.additionalComments,
    participateInMonthlyReview: record.participateInMonthlyReview,
    ratings: { ...record.ratings },
  };
}

export function findFirstRatedStep(record: RecordData): number {
  const sections = [
    ['product-quality', 'matches-description', 'durability', 'value-for-money'],
    ['websites-ease-of-use', 'product-search', 'checkout-process', 'payment-options'],
    ['delivery-experience', 'delivery-speed', 'packaging-quality'],
    ['support-responsiveness', 'support-helpfulness'],
  ];

  for (let i = 0; i < sections.length; i++) {
    if (sections[i].some((cat) => (record.ratings[cat] || 0) > 0)) {
      return i;
    }
  }

  return 0;
}