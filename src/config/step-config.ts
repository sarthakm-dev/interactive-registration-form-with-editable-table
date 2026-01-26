export const STEP_CONFIG=[
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