export type ValidationRule =
  | { type: 'required'; message: string }
  | { type: 'pattern'; pattern: RegExp; message: string }
  | { type: 'rating-required'; message: string }
  | {
      type: 'conditional-required';
      dependsOn: string;
      value: string;
      message: string;
    };

export type FieldValidationConfig = {
  [fieldName: string]: ValidationRule[];
};

export const VALIDATION_CONFIG: Record<number, FieldValidationConfig> = {
  0: {
    orderNumber: [
      { type: 'required', message: 'Order number is required' },
      {
        type: 'pattern',
        pattern: /^ORD-\d{6}$/,
        message: 'Format must be ORD-XXXXXX',
      },
    ],
    email: [
      { type: 'required', message: 'Email is required' },
      {
        type: 'pattern',
        pattern: /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/,
        message: 'Invalid email address',
      },
    ],
    purchaseDate: [
      { type: 'required', message: 'Purchase date is required' },
    ],
    
     shoppingMethod: [{ type: 'required', message: 'Select shopping method' }],
    'product-quality' : [{type: 'rating-required',message:'Required'}],
    'matches-description' : [{type: 'rating-required',message:'Required'}],
    'durability' : [{type: 'rating-required',message:'Required'}],
    'value-for-money' : [{type: 'rating-required',message: 'Required'}]
  },

  1: {
    'websites-ease-of-use': [{ type: 'rating-required', message: 'Required' }],
    'product-search': [{ type: 'rating-required', message: 'Required' }],
    'checkout-process': [{ type: 'rating-required', message: 'Required' }],
    'payment-options': [{ type: 'rating-required', message: 'Required' }],
  },

  2: {
    'delivery-experience': [{ type: 'rating-required', message: 'Required' }],
    'delivery-speed': [{ type: 'rating-required', message: 'Required' }],
    'packaging-quality': [{ type: 'rating-required', message: 'Required' }],
    packageContentMatch: [
      { type: 'required', message: 'Please select an option' },
    ],
  },

  3: {
    'support-contacted': [{ type: 'required', message: 'Required' }],
    'support-responsiveness': [
      {
        type: 'conditional-required',
        dependsOn: 'supportContacted',
        value: 'yes',
        message: 'Required when support contacted',
      },
    ],
    'support-helpfulness': [
      {
        type: 'conditional-required',
        dependsOn: 'supportContacted',
        value: 'yes',
        message: 'Required when support contacted',
      },
    ],
    'recommendation-experience': [
      { type: 'required', message: 'Required' },
    ],
  },
};