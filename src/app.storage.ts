import { state } from './app.state';

const KEY = 'feedback-app-state';

export function loadFromStorage(): void {
  const raw = localStorage.getItem(KEY);
  if (!raw) return;
  Object.assign(state, JSON.parse(raw));
}

export function saveToStorage(): void {
  localStorage.setItem(KEY, JSON.stringify(state));
}