import { appState, setState } from '../../app.state';
import * as appLogic from '../../app.logic';
import * as dom from '../../utils/dom';
import { renderApp } from '.././App';
import { saveRecordsToStorage } from '../../app.storage';

export function showDeleteModal(index: number): void {
  const deleteModal = dom.queryId('delete-modal-overlay');
  if (!deleteModal) return;

  dom.removeClass(deleteModal, 'hidden');

  // Remove old event listeners by cloning and replacing buttons
  const confirmBtn = dom.queryId('delete-confirm');
  const cancelBtn = dom.queryId('delete-cancel');

  if (confirmBtn) {
    const newConfirmBtn = confirmBtn.cloneNode(true) as HTMLElement;
    confirmBtn.replaceWith(newConfirmBtn);
    newConfirmBtn.addEventListener('click', () => {
      const newRecords = appLogic.deleteRecordFromList(appState.records, index);
      setState({ records: newRecords, deletingIndex: null, validationErrors: {} });

      // Save to storage
      saveRecordsToStorage(newRecords);

      dom.addClass(deleteModal, 'hidden');
      renderApp();
    });
  }

  if (cancelBtn) {
    const newCancelBtn = cancelBtn.cloneNode(true) as HTMLElement;
    cancelBtn.replaceWith(newCancelBtn);
    newCancelBtn.addEventListener('click', () => {
      setState({ deletingIndex: null, validationErrors: {} });
      dom.addClass(deleteModal, 'hidden');
    });
  }
}