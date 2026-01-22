import { addClass } from '../../utils/addClass';
import { removeClass } from '../../utils/removeClass';

export function showDuplicateModal(): void {
  const modal = document.getElementById('duplicate-modal-overlay');
  if (!modal) return;
  
  removeClass(modal, 'hidden');

  const okBtn = document.getElementById('duplicate-ok');
  if (okBtn) {
    okBtn.onclick = () => {
      addClass(modal, 'hidden');
    };
  }
}