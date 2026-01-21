import { getState } from '../../app.state';
import { addClass } from '../../utils/addClass';
import { removeClass } from '../../utils/removeClass';

export function showSuccessModal(): void {
  const modal = document.getElementById('success-modal-overlay');
  if (!modal) return;

  const message = document.getElementById('success-message');
  if (message) {
    message.textContent = getState.editingIndex !== null ? 'Form updated successfully' : 'Form submitted successfully';
  }

  removeClass(modal, 'hidden');

  const okBtn = document.getElementById('success-ok');
  if (okBtn) {
    okBtn.onclick = () => {
      addClass(modal, 'hidden');
    };
  }
}