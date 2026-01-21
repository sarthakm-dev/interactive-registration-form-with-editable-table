import { type RatingMap } from '../types/ratings';
export function initializeRatingMap(): RatingMap {
  return {
    'product-quality': 0,
    'matches-description': 0,
    'durability': 0,
    'value-for-money': 0,
    'websites-ease-of-use': 0,
    'product-search': 0,
    'checkout-process': 0,
    'payment-options': 0,
    'delivery-experience': 0,
    'delivery-speed': 0,
    'packaging-quality': 0,
    'support-responsiveness': 0,
    'support-helpfulness': 0,
  };
}