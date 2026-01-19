import { type FieldKey } from './types';

import { type FieldConfig } from './types';
import { Step } from './types';
export const FORM_FIELDS: FieldConfig[] = [
  {
  key: 'orderNumber',
  label: 'Order Number',
  type: 'text',
  step: Step.ORDER
},
{
  key: 'email',
  label: 'Email',
  type: 'email',
  step: Step.ORDER
},
{
  key: 'purchaseDate',
  label: 'Purchase Date',
  type: 'date',
  step: Step.ORDER
},
{
  key: 'shoppingMethod',
  label: 'Shopping Method',
  type: 'radio',
  options: ['Online', 'Offline'],
  step: Step.ORDER
},
{
  key: 'supportContacted',
  label: 'Did you contact support?',
  type: 'radio',
  options: ['yes', 'no'],
  step: Step.ORDER
},
{
  key: 'whatDidYouLike',
  label: 'What did you like?',
  type: 'textarea',
  step: Step.FEEDBACK
},
{
  key: 'whatToImprove',
  label: 'What can we improve?',
  type: 'textarea',
  step: Step.FEEDBACK
},
{
  key: 'additionalComments',
  label: 'Additional comments',
  type: 'textarea',
  step: Step.FEEDBACK
},
{
  key: 'productQuality',
  type: 'rating',
  label: 'Product Quality',
  ratingKey: 'product-quality',
  step: Step.RATINGS
},
{
  key: 'valueForMoney',
  type: 'rating',
  label: 'Value for Money',
  ratingKey: 'value-for-money',
  step: Step.RATINGS
},
{
  key: 'deliveryExperience',
  type: 'rating',
  label: 'Delivery Experience',
  ratingKey: 'delivery-experience',
  step: Step.RATINGS
},
{
  key: 'supportResponsiveness',
  type: 'rating',
  label: 'Support Responsiveness',
  ratingKey: 'support-responsiveness',
  step: Step.RATINGS
},
{
  key: 'recommendToFriends',
  label: 'Would you recommend us?',
  type: 'select',
  options: ['Definitely Yes', 'Maybe', 'No'],
  step: Step.FINAL
},
{
  key: 'packageContentMatch',
  label: 'Package content match',
  type: 'select',
  options: ['Perfect', 'Wrong Items', 'Missing Items'],
  step: Step.FINAL
},
{
  key: 'participateInMonthlyReview',
  label: 'Participate in monthly review?',
  type: 'radio',
  options: ['yes', 'no'],
  step: Step.FINAL
}

];