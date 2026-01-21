import { getState, setState } from '../../app.state';
import { renderApp } from '../App';
import { saveRecordsToStorage } from '../../app.storage';
import { showSuccessModal } from '../modal/SuccessModal';
import { resetNotebookState } from './NotebookState';
import { resetForm } from '../../utils/resetForm';
import { validateFormForSubmission } from '../../services/validateFormSubmission';
import { createRecordFromFormData } from '../../services/createRecordFromData';
import { addRecordToList } from '../../services/addRecordToList';
import { updateRecordInList } from '../../services/updateRecordInList';

export function handleSubmit(e: Event): void {
  e.preventDefault();

  const { valid, errors } = validateFormForSubmission(
    getState.formData,
    getState.ratingData,
    getState.records,
    getState.editingIndex,
  );

  if (!valid) {
    // Mark errors visually
    setState({ validationErrors: errors });
    renderApp();
    return;
  }
  let newRecords = getState.records;

  if (getState.editingIndex !== null) {
    const record = createRecordFromFormData(
      getState.formData,
      getState.ratingData,
    );
    newRecords = updateRecordInList(
      getState.records,
      getState.editingIndex,
      record,
    );
  } else {
    const record = createRecordFromFormData(
      getState.formData,
      getState.ratingData,
    );
    newRecords = addRecordToList(getState.records, record);
  }
  console.log("New Records:", newRecords);
  setState({ records: newRecords });
  saveRecordsToStorage(newRecords);

  // Show success modal


  // Reset form
  resetForm();
  resetNotebookState();
  renderApp();
  showSuccessModal();
}