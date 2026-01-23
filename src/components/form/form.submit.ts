import { getState, setState } from '../../app.state';
import { renderApp } from '..';
import { saveRecordsToStorage } from '../../app.storage';
import { resetNotebookState } from './form.reset';
import { resetForm } from '../../utils/resetForm';
import { validateFormForSubmission } from '../../services/validateFormSubmission';
import { createRecordFromFormData } from '../../services/createRecordFromData';
import { updateRecordInList } from '../../services/updateRecordInList';
import { addRecordToList } from '../../services/addRecordToList';

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
  setState({showSuccessModal:true});
  // Reset form
  resetForm();
  resetNotebookState();
  renderApp();
  
}