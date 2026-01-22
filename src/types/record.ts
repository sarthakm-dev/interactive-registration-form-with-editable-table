import { type RatingMap } from "./rating";

export interface RecordData {
    orderNumber: string | null,
    email: string | null,
    purchaseDate: string | null,
    shoppingMethod: string | null,
    packageContentMatch: string | null,
    supportContacted: string | null,
    recommendToFriend: string | null,
    whatDidYouLike: string | null,
    whatToImprove: string | null,
    additionalComment: string | null,
    participateInMonthlyReview: string,
    rating: RatingMap,
}