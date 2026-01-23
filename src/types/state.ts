import type { RatingMap } from "./rating";
import type { RecordData } from "./record";
import type { Theme } from "./theme";
import type { ValidationErrors } from "./validation";

export interface AppState {
  theme: Theme;
  showDuplicateModal: boolean;
  records: RecordData[];
  currentStep: number;
  editingIndex: number | null;
  deletingIndex: number | null;
  ratingData: RatingMap;
  formData: Partial<RecordData>;
  validationErrors: ValidationErrors;
}