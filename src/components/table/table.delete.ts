import { getState, setState } from '../../app.state';
import { saveRecordsToStorage } from '../../app.storage';
import { deleteRecordFromList } from '../../services/deleteServicesFromList';
import { addClass } from '../../ui/addClass';
import { removeClass } from '../../utils/removeClass';
import { renderApp } from '..';

function showDeleteModal(index: number): void {
  const deleteModal = document.getElementById('delete-modal-overlay');
  if (!deleteModal) return;

  removeClass(deleteModal, 'hidden');

  // Remove old event listeners by cloning and replacing buttons
  const confirmBtn = document.getElementById('delete-confirm');
  const cancelBtn = document.getElementById('delete-cancel');

  if (confirmBtn) {
    const newConfirmBtn = confirmBtn.cloneNode(true) as HTMLElement;
    confirmBtn.replaceWith(newConfirmBtn);
    newConfirmBtn.addEventListener('click', () => {
      const newRecords = deleteRecordFromList(getState.records, index);
      setState({ records: newRecords, deletingIndex: null, validationErrors: {} });

      // Save to storage
      saveRecordsToStorage(newRecords);

      addClass(deleteModal, 'hidden');
      renderApp();
    });
  }

  if (cancelBtn) {
    const newCancelBtn = cancelBtn.cloneNode(true) as HTMLElement;
    cancelBtn.replaceWith(newCancelBtn);
    newCancelBtn.addEventListener('click', () => {
      setState({ deletingIndex: null, validationErrors: {} });
      addClass(deleteModal, 'hidden');
    });
  }
}
export function handleDelete(index: number): void {
  setState({
    deletingIndex: index,
  });

  showDeleteModal(index);
}