export type FormData = {
  orderNumber: string;
  email: string;
  date: string;
  shoppingMethod: string;

  packageContentExperience?: string;
  supportContacted?: "yes" | "no";
  recommendationExperience?: string;

  whatDidYouLike?: string;
  whatToImprove?: string;
  additionalComment?: string;
  review?: boolean;
};