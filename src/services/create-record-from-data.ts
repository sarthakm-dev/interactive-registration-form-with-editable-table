import { type RecordData } from '.././types/record';
import { type RatingMap } from '../types/rating';

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
    recommendToFriend: formData.recommendToFriend || null,
    whatDidYouLike: formData.whatDidYouLike || null,
    whatToImprove: formData.whatToImprove || null,
    additionalComment: formData.additionalComment || null,
    participateInMonthlyReview: formData.participateInMonthlyReview || 'no',
    rating: { ...ratingData },
  };
}