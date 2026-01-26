import { resetForm } from '../../utils/reset-form';
import { populateFormDataFromRecord } from '../../services/populate-form-data';
import { findFirstRatedStep } from '../../services/find-first-rated-step';
import { getState, setState } from '../../core/state';


export function handleEdit(index: number): void {
  const record = getState.records[index];
  if (!record) return;
  resetForm();
  // Load record into form
  const formData = populateFormDataFromRecord(record);
  const currentStep = findFirstRatedStep(record);

  setState({
    editingIndex: index,
    formData,
    currentStep,
    ratingData: { ...record.rating },
  });

  // Update button text and scroll to form
  const submitBtn = document.getElementById('submit');
  if (submitBtn) {
    submitBtn.textContent = "Update";
  }

  document.body.scrollIntoView({behavior:'smooth'});
}

