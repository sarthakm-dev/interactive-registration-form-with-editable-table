import { appState, setState } from '../../app.state';
import * as appLogic from '../../app.logic';
import * as dom from '../../utils/dom';
import { renderApp } from '.././App';

export function handleEdit(index: number): void {
  const record = appState.records[index];
  if (!record) return;

  // Load record into form
  const formData = appLogic.populateFormDataFromRecord(record);
  const currentStep = appLogic.findFirstRatedStep(record);

  setState({
    editingIndex: index,
    formData,
    currentStep,
    ratingData: { ...record.ratings },
  });

  // Update button text and scroll to form
  const submitBtn = dom.queryId('submit');
  if (submitBtn) {
    dom.setText(submitBtn, 'Update');
  }

  dom.scrollTo(document.body, 'smooth');
  renderApp();
}