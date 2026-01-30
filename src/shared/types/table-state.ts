import type { TableRow } from '../../features/survey/types/table';

export type TableState = {
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
