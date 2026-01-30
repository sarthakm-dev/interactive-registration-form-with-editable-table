import { create } from 'zustand';
import type { TableRow } from '../features/survey/types/table';
import { useUIStore } from './useUIStore';

type TableState = {
  rows: TableRow[];
  editingRow: TableRow | null;
  viewRow: TableRow | null;
  deleteTarget: string | null;
  addOrUpdateRow: (row: TableRow) => boolean;
  setEditingRow: (row: TableRow | null) => void;
  setViewRow: (row: TableRow | null) => void;
  requestDelete: (id: string) => void;
  setDeleteTarget: (id: string | null) => void;
  confirmDelete: () => void;
};

export const useTableStore = create<TableState>((set, get) => ({
  rows: [],
  editingRow: null,
  viewRow: null,
  deleteTarget: null,

  addOrUpdateRow: (row) => {
    const { rows } = get();

    const isDuplicate = rows.some(
      (r) => r.id !== row.id && r.orderNumber === row.orderNumber && r.email === row.email,
    );

    if (isDuplicate) {
      useUIStore.getState().openError('This Order Number and Email combination already exists');
      return false;
    }

    set((state) => {
      const exists = state.rows.some((r) => r.id === row.id);
      return {
        rows: exists ? state.rows.map((r) => (r.id === row.id ? row : r)) : [...state.rows, row],
        editingRow: null,
      };
    });
    return true;
  },

  setEditingRow: (row) => set({ editingRow: row }),
  setViewRow: (row) => set({ viewRow: row }),

  requestDelete: (id) => set({ deleteTarget: id }),
  setDeleteTarget: (id) => set({ deleteTarget: id }),

  confirmDelete: () => {
    const { deleteTarget, rows } = get();
    if (!deleteTarget) return;

    set({
      rows: rows.filter((r) => r.id !== deleteTarget),
      deleteTarget: null,
    });
  },
}));
