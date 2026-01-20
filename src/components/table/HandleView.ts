import { appState } from '../../app.state';
import { showRatingModal } from './ShowRating';

export function handleView(index: number): void {
  const record = appState.records[index];
  if (!record) return;

  showRatingModal(record);
}