import { type RecordData } from '.././types/record';

export function populateFormDataFromRecord(record: RecordData): Partial<RecordData> {
  return {
    orderNumber: record.orderNumber,
    email: record.email,
    purchaseDate: record.purchaseDate,
    shoppingMethod: record.shoppingMethod,
    packageContentMatch: record.packageContentMatch,
    supportContacted: record.supportContacted,
    recommendToFriend: record.recommendToFriend,
    whatDidYouLike: record.whatDidYouLike,
    whatToImprove: record.whatToImprove,
    additionalComment: record.additionalComment,
    participateInMonthlyReview: record.participateInMonthlyReview,
    rating: { ...record.rating },
  };
}