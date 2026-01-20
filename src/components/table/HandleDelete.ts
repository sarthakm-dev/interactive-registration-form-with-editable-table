import { setState } from '../../app.state';
import { showDeleteModal } from './ShowDelete';

export function handleDelete(index: number): void {
  setState({
    deletingIndex: index,
  });

  showDeleteModal(index);
}