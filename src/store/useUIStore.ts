import { create } from 'zustand';
import type { UIState } from '../shared/types/ui-state';

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
