import { type RecordData } from '.././types/record';

export function findFirstRatedStep(record: RecordData): number {
  const sections = [
    ['product-quality', 'matches-description', 'durability', 'value-for-money'],
    ['websites-ease-of-use', 'product-search', 'checkout-process', 'payment-options'],
    ['delivery-experience', 'delivery-speed', 'packaging-quality'],
    ['support-responsiveness', 'support-helpfulness'],
  ];

  for (let i = 0; i < sections.length; i++) {
    if (sections[i].some((cat) => (record.rating[cat] || 0) > 0)) {
      return i;
    }
  }

  return 0;
}