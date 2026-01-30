type SuccessType = 'create' | 'update';
type Theme = 'light' | 'dark';
export type UIState = {
  showSuccess: boolean;
  successType: SuccessType;
  theme: Theme;
  showError: boolean;
  errorMessage: string;
  openSuccess: (type: SuccessType) => void;
  closeSuccess: () => void;
  openError: (message: string) => void;
  isFormOpen: boolean;
  openForm: () => void;
  closeForm: () => void;
  closeError: () => void;
  toggleTheme: () => void;
};
