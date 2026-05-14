/* ============================================
   CINC Connect Demo — App Dialogs
   Replaces native confirm/alert with on-brand
   centered modals using the existing modal-sheet
   styles. Returns Promises for clean async use.
   ============================================ */

(function () {
  'use strict';

  function buildBackdrop() {
    const backdrop = document.createElement('div');
    backdrop.className = 'modal-backdrop modal-backdrop--center app-dialog__backdrop';
    return backdrop;
  }

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, (c) => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    }[c]));
  }

  // confirm({ title, message, confirmLabel, cancelLabel, danger }) → Promise<boolean>
  function confirm(opts) {
    opts = opts || {};
    return new Promise((resolve) => {
      const backdrop = buildBackdrop();
      backdrop.innerHTML = `
        <div class="modal-sheet app-dialog">
          ${opts.title ? `<h3 class="app-dialog__title">${escapeHtml(opts.title)}</h3>` : ''}
          <p class="app-dialog__body">${escapeHtml(opts.message || '')}</p>
          <div class="app-dialog__actions">
            <button class="app-dialog__btn app-dialog__btn--cancel" type="button" data-action="cancel">${escapeHtml(opts.cancelLabel || 'Cancel')}</button>
            <button class="app-dialog__btn ${opts.danger ? 'app-dialog__btn--danger' : 'app-dialog__btn--confirm'}" type="button" data-action="confirm">${escapeHtml(opts.confirmLabel || 'Confirm')}</button>
          </div>
        </div>
      `;

      function close(result) {
        backdrop.remove();
        document.removeEventListener('keydown', onKey);
        resolve(result);
      }
      function onKey(e) {
        if (e.key === 'Escape') close(false);
        else if (e.key === 'Enter') close(true);
      }
      backdrop.addEventListener('click', (e) => {
        const action = e.target.closest('[data-action]')?.dataset.action;
        if (action === 'confirm') close(true);
        else if (action === 'cancel' || e.target === backdrop) close(false);
      });
      document.addEventListener('keydown', onKey);
      document.body.appendChild(backdrop);
    });
  }

  // alert({ title, message, confirmLabel }) → Promise<void>
  function alert(opts) {
    opts = opts || {};
    return new Promise((resolve) => {
      const backdrop = buildBackdrop();
      backdrop.innerHTML = `
        <div class="modal-sheet app-dialog">
          ${opts.title ? `<h3 class="app-dialog__title">${escapeHtml(opts.title)}</h3>` : ''}
          <p class="app-dialog__body">${escapeHtml(opts.message || '')}</p>
          <div class="app-dialog__actions app-dialog__actions--single">
            <button class="app-dialog__btn app-dialog__btn--confirm" type="button" data-action="ok">${escapeHtml(opts.confirmLabel || 'OK')}</button>
          </div>
        </div>
      `;

      function close() {
        backdrop.remove();
        document.removeEventListener('keydown', onKey);
        resolve();
      }
      function onKey(e) {
        if (e.key === 'Escape' || e.key === 'Enter') close();
      }
      backdrop.addEventListener('click', (e) => {
        if (e.target.closest('[data-action="ok"]') || e.target === backdrop) close();
      });
      document.addEventListener('keydown', onKey);
      document.body.appendChild(backdrop);
    });
  }

  window.AppDialog = { confirm, alert };
})();
