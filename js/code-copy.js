/**
 * Code Copy Functionality for Prismatic Promo Site
 * Adds copy-to-clipboard buttons to all code blocks
 */

document.addEventListener('DOMContentLoaded', function() {
    // Add copy buttons to all pre > code blocks
    const codeBlocks = document.querySelectorAll('pre code');

    codeBlocks.forEach(function(codeBlock) {
        // Skip if already processed
        if (codeBlock.parentElement.querySelector('.copy-code-btn')) {
            return;
        }

        // Create copy button
        const copyButton = document.createElement('button');
        copyButton.className = 'copy-code-btn absolute top-2 right-2 px-2 py-1 text-xs bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white rounded transition-colors duration-200';
        copyButton.innerHTML = '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>';
        copyButton.title = 'Copy to clipboard';

        // Make pre container relative for absolute positioning
        const preElement = codeBlock.parentElement;
        preElement.style.position = 'relative';

        // Add copy functionality
        copyButton.addEventListener('click', async function() {
            try {
                await navigator.clipboard.writeText(codeBlock.textContent);

                // Visual feedback
                const originalHTML = copyButton.innerHTML;
                copyButton.innerHTML = '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>';
                copyButton.className = copyButton.className.replace('bg-gray-700', 'bg-green-600');
                copyButton.title = 'Copied!';

                // Reset after 2 seconds
                setTimeout(function() {
                    copyButton.innerHTML = originalHTML;
                    copyButton.className = copyButton.className.replace('bg-green-600', 'bg-gray-700');
                    copyButton.title = 'Copy to clipboard';
                }, 2000);

            } catch (err) {
                // Fallback for older browsers
                const textArea = document.createElement('textarea');
                textArea.value = codeBlock.textContent;
                document.body.appendChild(textArea);
                textArea.select();
                try {
                    document.execCommand('copy');
                    copyButton.innerHTML = '✓';
                    setTimeout(function() {
                        copyButton.innerHTML = originalHTML;
                    }, 2000);
                } catch (fallbackErr) {
                    console.warn('Copy to clipboard not supported');
                }
                document.body.removeChild(textArea);
            }
        });

        // Insert copy button
        preElement.appendChild(copyButton);
    });

    // Also handle dynamically added code blocks (for frameworks like Alpine.js)
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'childList') {
                mutation.addedNodes.forEach(function(node) {
                    if (node.nodeType === Node.ELEMENT_NODE) {
                        const newCodeBlocks = node.querySelectorAll('pre code');
                        newCodeBlocks.forEach(function(codeBlock) {
                            // Trigger the same logic for new code blocks
                            const event = new Event('DOMContentLoaded');
                            document.dispatchEvent(event);
                        });
                    }
                });
            }
        });
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
});

// Export for module systems if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { initCodeCopy: function() { /* Already handled by DOMContentLoaded */ } };
}