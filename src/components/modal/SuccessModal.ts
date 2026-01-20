import { appState } from '../../app.state';
import * as dom from '../../utils/dom';


export function showSuccessModal(): void {
  const modal = dom.queryId('success-modal-overlay');
  if (!modal) return;

  const message = dom.queryId('success-message');
  if (message) {
    dom.setText(
      message,
      appState.editingIndex !== null ? 'Form updated successfully' : 'Form submitted successfully',
    );
  }

  dom.removeClass(modal, 'hidden');

  const okBtn = dom.queryId('success-ok');
  if (okBtn) {
    okBtn.onclick = () => {
      dom.addClass(modal, 'hidden');
    };
  }
}