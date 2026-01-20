import { type RecordData } from './types';

const STORAGE_KEY = 'customer-feedback-records';

export function loadRecordsFromStorage(): RecordData[] {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return [];
  try {
    return JSON.parse(stored) as RecordData[];
  } catch {
    return [];
  }
}

export function saveRecordsToStorage(records: RecordData[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
}