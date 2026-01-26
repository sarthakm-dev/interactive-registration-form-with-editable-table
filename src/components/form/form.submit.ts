import { getState, setState } from '../../core/state';
import { resetNotebookState } from './form.reset';
import { saveRecordsToStorage } from '../../core/storage';
import { resetForm } from '../../utils/reset-form';
import { validateFormForSubmission } from '../../services/validate-form-submission';
import { createRecordFromFormData } from '../../services/create-record-from-data';
import { updateRecordInList } from '../../services/update-record-in-list';
import { addRecordToList } from '../../services/add-record-to-list';

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
  
}

