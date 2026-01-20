import type { RatingMap } from "./ratings";
import type { RecordData } from "./record";
import type { ValidationErrors } from "./validation";

export interface AppState {
  records: RecordData[];
  currentStep: number;
  editingIndex: number | null;
  deletingIndex: number | null;
  ratingData: RatingMap;
  formData: Partial<RecordData>;
  validationErrors: ValidationErrors;
}