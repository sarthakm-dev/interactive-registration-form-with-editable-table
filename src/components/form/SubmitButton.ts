import { appState, setState, resetForm } from '../../app.state';
import * as appLogic from '../../app.logic';
import { renderApp } from '.././App';
import { saveRecordsToStorage } from '../../app.storage';
import { showSuccessModal } from '../modal/SuccessModal';
import { resetNotebookState } from './NotebookState';

export function handleSubmit(e: Event): void {
  e.preventDefault();

  const { valid, errors } = appLogic.validateFormForSubmission(
    appState.formData,
    appState.ratingData,
    appState.records,
    appState.editingIndex,
  );
  console.log("FormData",appState.formData);
  console.log("ratingdata",appState.ratingData);
  console.log("records",appState.records);
  console.log("editingdata",appState.editingIndex);
  console.log("Errors",errors);
  if (!valid) {
    // Mark errors visually
    setState({ validationErrors: errors });
    renderApp();
    return;
  }
  console.log("valid Check Passed");
  let newRecords = appState.records;

  if (appState.editingIndex !== null) {
    const record = appLogic.createRecordFromFormData(
      appState.formData,
      appState.ratingData,
    );
    newRecords = appLogic.updateRecordInList(
      appState.records,
      appState.editingIndex,
      record,
    );
  } else {
    const record = appLogic.createRecordFromFormData(
      appState.formData,
      appState.ratingData,
    );
    newRecords = appLogic.addRecordToList(appState.records, record);
  }
  console.log("New Records:",newRecords);
  setState({ records: newRecords });
  saveRecordsToStorage(newRecords);

  // Show success modal
  showSuccessModal();

  // Reset form
  resetForm();
  resetNotebookState();
  renderApp();
}