import { create } from 'zustand';

type SuccessType = 'create' | 'update';
type Theme = 'light' | 'dark';
type UIState = {
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

export const useUIStore = create<UIState>((set) => ({
  showSuccess: false,
  successType: 'create',
  showError: false,
  errorMessage: '',
  theme: 'light',
  openSuccess: (type) => set({ showSuccess: true, successType: type }),
  closeSuccess: () => set({ showSuccess: false }),
  openError: (message) => set({ showError: true, errorMessage: message }),
  closeError: () => set({ showError: false, errorMessage: '' }),
  isFormOpen: false,

  openForm: () => set({ isFormOpen: true }),
  closeForm: () => set({ isFormOpen: false }),
  toggleTheme: () =>
    set((state) => ({
      theme: state.theme === 'light' ? 'dark' : 'light',
    })),
}));
