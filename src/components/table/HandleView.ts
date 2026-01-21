import { getState } from '../../app.state';
import { showRatingModal } from './ShowRating';

export function handleView(index: number): void {
  const record = getState.records[index];
  if (!record) return;

  showRatingModal(record);
}