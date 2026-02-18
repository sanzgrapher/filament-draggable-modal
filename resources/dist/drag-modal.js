/**
 * Filament v5 Draggable Modal
 * features:
 * - Makes Filament modals draggable by their header or title area.
 * - Automatically detects and applies to new modals added to the DOM.
 * - slideover modals are draggable only if enabled via config .
 * - border constraints to prevent dragging completely off-screen.
 */
(function () {
    'use strict';

    const MODAL_SELECTOR = '.fi-modal-window';
    const SLIDEOVER_CLASS = 'fi-modal-slide-over';

    const HANDLE_SELECTORS = [
        '.fi-modal-header',
        '.fi-modal-heading',
        '[data-slot="title"]',
        'header',
    ];

    const attachedModals = new WeakSet();

    function getConfig() {
        return window.FilamentDraggableModalConfig || {
            enableSlideoverDraggable: false
        };
    }

    function isSlideoverModal(modal) {
        if (!modal) return false;
        const wrapper = modal.closest('.fi-modal');
        return wrapper && wrapper.classList.contains(SLIDEOVER_CLASS);
    }

    function isReallyVisible(el) {
        if (!el || !document.body.contains(el)) return false;
        const rect = el.getBoundingClientRect();
        if (rect.width === 0 || rect.height === 0) return false;
        const style = window.getComputedStyle(el);
        if (style.display === 'none' || style.visibility === 'hidden') return false;
        if (parseFloat(style.opacity) < 0.1) return false;
        const wrapper = el.closest('.fi-modal');
        if (wrapper) {
            const ws = window.getComputedStyle(wrapper);
            if (ws.display === 'none' || ws.visibility === 'hidden') return false;
            if (parseFloat(ws.opacity) < 0.1) return false;
        }
        return true;
    }

    function makeDraggable(modal) {
        if (!modal || attachedModals.has(modal)) return;

        // Check if this is a slideover modal and if slideover draggable is disabled
        const config = getConfig();
        if (isSlideoverModal(modal) && !config.enableSlideoverDraggable) {
            return; // Skip making slideover modals draggable if disabled
        }

        attachedModals.add(modal);

        modal.classList.add('fi-modal-draggable-enabled');

        let handle = null;
        for (const sel of HANDLE_SELECTORS) {
            handle = modal.querySelector(sel);
            if (handle) break;
        }
        if (!handle) handle = modal;

        // Set cursor and user-select styling explicitly
        handle.style.userSelect = 'none';
        handle.style.cursor = 'move';

        let startX, startY, initialX, initialY, isDragging = false;

        function onMouseDown(e) {
            if (e.button !== 0) return;
            if (e.target.closest('button, input, select, textarea, a, [role="button"]')) return;

            const rect = modal.getBoundingClientRect();
            initialX = rect.left;
            initialY = rect.top;
            startX = e.clientX;
            startY = e.clientY;
            isDragging = false;
            
            // Set grabbing cursor on mousedown
            handle.style.cursor = 'grabbing';

            document.addEventListener('mousemove', onMouseMove, { passive: false });
            document.addEventListener('mouseup', onMouseUp);
            e.preventDefault();
        }

        function onMouseMove(e) {
            const dx = e.clientX - startX;
            const dy = e.clientY - startY;

            if (!isDragging && (Math.abs(dx) > 3 || Math.abs(dy) > 3)) {
                isDragging = true;
                const rect = modal.getBoundingClientRect();
                modal.style.width = rect.width + 'px';
                modal.style.position = 'fixed';
                modal.style.margin = '0';
                modal.style.transform = 'none';
                modal.style.left = rect.left + 'px';
                modal.style.top = rect.top + 'px';
                modal.style.right = 'auto';
                modal.style.bottom = 'auto';
                modal.classList.add('is-dragging');
            }

            if (!isDragging) return;

            const vw = window.innerWidth;
            const vh = window.innerHeight;
            const rect = modal.getBoundingClientRect();
            const min = 50;

            modal.style.left = Math.max(-rect.width + min, Math.min(initialX + dx, vw - min)) + 'px';
            modal.style.top = Math.max(10, Math.min(initialY + dy, vh - min)) + 'px';
            e.preventDefault();
        }

        function onMouseUp() {
            if (isDragging) modal.classList.remove('is-dragging');
            isDragging = false;
            // Restore move cursor after drag ends
            handle.style.cursor = 'move';
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        }

        handle.addEventListener('mousedown', onMouseDown);
    }

    function scanForModals() {
        document.querySelectorAll(MODAL_SELECTOR).forEach(modal => {
            if (!attachedModals.has(modal) && isReallyVisible(modal)) {
                makeDraggable(modal);
            }
        });
    }

    function init() {
        scanForModals();
        setInterval(scanForModals, 500);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    if (typeof window !== 'undefined') {
        window.FilamentDraggableModal = { makeDraggable, init };
    }
})();
