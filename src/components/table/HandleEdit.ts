import { getState, setState } from '../../app.state';
import { renderApp } from '.././App';
import { findFirstRatedStep } from '../../services/findFirstRatedStep';
import { populateFormDataFromRecord } from '../../services/populateFormData';

export function handleEdit(index: number): void {
  const record = getState.records[index];
  if (!record) return;

  // Load record into form
  const formData = populateFormDataFromRecord(record);
  const currentStep = findFirstRatedStep(record);

  setState({
    editingIndex: index,
    formData,
    currentStep,
    ratingData: { ...record.ratings },
  });

  // Update button text and scroll to form
  const submitBtn = document.getElementById('submit');
  if (submitBtn) {
    submitBtn.textContent = "Update";
  }

  document.body.scrollIntoView({behavior:'smooth'});
  renderApp();
}