/**
 * Filament v5 Draggable Modal
 */
(function () {
    'use strict';

    const modalSelectors = [
        '.fi-modal-window',
        '[role="dialog"]',
    ];

    const headerSelectors = [
        '.fi-modal-header',
        '.fi-modal-heading',
        '[data-slot="title"]',
        'header',
    ];

    function makeDraggable(modal) {
        if (!modal || modal.dataset.draggableModalAttached === '1') return;

        const dialogWindow = modal.classList.contains('fi-modal-window')
            ? modal
            : (modal.querySelector('.fi-modal-window') || modal);

        if (!dialogWindow) return;
        modal.dataset.draggableModalAttached = '1';

        let handle = null;
        for (const sel of headerSelectors) {
            handle = dialogWindow.querySelector(sel);
            if (handle) break;
        }

        if (!handle) handle = dialogWindow;

        handle.style.cursor = 'move';
        handle.style.userSelect = 'none';

        let startX = 0, startY = 0, initialX = 0, initialY = 0;

        function onMouseDown(e) {
            if (e.button !== 0) return;
            if (e.target.closest('button, input, select, textarea, a')) return;

            const rect = dialogWindow.getBoundingClientRect();

            initialX = rect.left;
            initialY = rect.top;

            startX = e.clientX;
            startY = e.clientY;

            dialogWindow.style.width = rect.width + 'px';
            // dialogWindow.style.height = rect.height + 'px'; // Let height be auto
            dialogWindow.style.position = 'fixed';
            dialogWindow.style.margin = '0';
            dialogWindow.style.transform = 'none';
            dialogWindow.style.left = initialX + 'px';
            dialogWindow.style.top = initialY + 'px';
            dialogWindow.style.right = 'auto';
            dialogWindow.style.bottom = 'auto';

            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);

            e.preventDefault();
        }

        function onMouseMove(e) {
            const dx = e.clientX - startX;
            const dy = e.clientY - startY;

            dialogWindow.style.left = (initialX + dx) + 'px';
            dialogWindow.style.top = (initialY + dy) + 'px';
        }

        function onMouseUp() {
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        }

        handle.addEventListener('mousedown', onMouseDown);
    }

    const observer = new MutationObserver(mutations => {
        for (const m of mutations) {
            for (const node of m.addedNodes) {
                if (!(node instanceof HTMLElement)) continue;
                if (modalSelectors.some(s => node.matches(s))) {
                    setTimeout(() => makeDraggable(node), 100);
                } else {
                    const found = node.querySelector(modalSelectors.join(','));
                    if (found) setTimeout(() => makeDraggable(found), 100);
                }
            }
        }
    });

    function init() {
        document.querySelectorAll(modalSelectors.join(',')).forEach(makeDraggable);
        observer.observe(document.body, { childList: true, subtree: true });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
