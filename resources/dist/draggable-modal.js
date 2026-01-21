/**
 * Filament v5 Draggable Modal
 */
(function () {
    'use strict';

    const modalSelectors = [
        '.fi-modal-window',
        '[role="dialog"]',
        '.fi-modal',
    ];

    const headerSelectors = [
        '.fi-modal-header',
        '.fi-modal-heading',
        '[data-slot="title"]',
        'header',
    ];

    function findModal(node) {
        if (!node || !(node instanceof HTMLElement)) return null;
        if (modalSelectors.some(s => node.matches(s))) return node;
        return modalSelectors.reduce((found, sel) => found || node.querySelector(sel), null);
    }

    function makeDraggable(modal) {
        if (!modal || modal.dataset.draggableModalAttached === '1') return;
        
        // Find the actual window element if the modal is a wrapper
        const dialogWindow = modal.classList.contains('fi-modal-window') 
            ? modal 
            : (modal.querySelector('.fi-modal-window') || modal);

        if (!dialogWindow) return;
        modal.dataset.draggableModalAttached = '1';

        // Find header to use as drag handle
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
            if (e.button !== 0) return; // Only left click
            
            // Don't drag if clicking buttons or inputs in header
            if (e.target.closest('button, input, select, textarea, a')) return;

            // Get current transform or position
            const rect = dialogWindow.getBoundingClientRect();
            
            // We'll use fixed positioning and left/top for dragging
            // but Filament modals use transforms for centering.
            // Let's clear transforms and switch to absolute units.
            
            const style = window.getComputedStyle(dialogWindow);
            const matrix = new DOMMatrix(style.transform);
            
            initialX = rect.left;
            initialY = rect.top;

            startX = e.clientX;
            startY = e.clientY;

            // Lock the window size before removing flex/auto centering
            dialogWindow.style.width = rect.width + 'px';
            dialogWindow.style.height = rect.height + 'px';
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
                const modal = findModal(node);
                if (modal) {
                    // Small timeout to ensure Filament has finished rendering/positioning
                    setTimeout(() => makeDraggable(modal), 50);
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
