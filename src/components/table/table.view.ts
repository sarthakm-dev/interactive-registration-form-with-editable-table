import { getState } from '../../core/state';
import { showRatingModal } from './table.rating';


export function handleView(index: number): void {
  const record = getState.records[index];
  if (!record) return;

  showRatingModal(record);
}

