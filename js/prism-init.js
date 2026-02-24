/**
 * Prism.js Bridge for Zola
 *
 * Zola renders code blocks as <pre><code data-lang="elixir">
 * but Prism expects <pre><code class="language-elixir">
 *
 * This script bridges the gap and triggers highlighting.
 */

(function () {
    'use strict';

    // Language alias map (Zola lang -> Prism lang)
    var LANG_MAP = {
        'sh': 'bash',
        'shell': 'bash',
        'zsh': 'bash',
        'console': 'bash',
        'yml': 'yaml',
        'dockerfile': 'docker',
        'ex': 'elixir',
        'exs': 'elixir',
        'eex': 'elixir',
        'heex': 'elixir',
        'ts': 'typescript',
        'js': 'javascript',
        'rb': 'ruby',
        'py': 'python',
        'rs': 'rust',
        'md': 'markdown',
        'html': 'markup',
        'xml': 'markup',
        'svg': 'markup',
        'txt': 'plaintext',
        'text': 'plaintext',
        'plain': 'plaintext'
    };

    function initPrism() {
        // Find all code blocks with data-lang attribute (Zola's format)
        var codeBlocks = document.querySelectorAll('pre > code[data-lang]');

        codeBlocks.forEach(function (codeEl) {
            var lang = codeEl.getAttribute('data-lang');
            if (!lang) return;

            // Normalize language name
            var prismLang = LANG_MAP[lang.toLowerCase()] || lang.toLowerCase();

            // Add Prism's expected class
            codeEl.classList.add('language-' + prismLang);

            // Also set on the parent pre element
            var preEl = codeEl.parentElement;
            if (preEl && preEl.tagName === 'PRE') {
                preEl.classList.add('language-' + prismLang);
                // Store original lang for the language badge
                preEl.setAttribute('data-lang', lang);
            }
        });

        // Now trigger Prism highlighting
        if (window.Prism) {
            Prism.highlightAll();
        }
    }

    // Run when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initPrism);
    } else {
        initPrism();
    }
})();
