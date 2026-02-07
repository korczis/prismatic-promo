// Mermaid.js Initialization for Prismatic Platform
// Handles: auto-detection of mermaid code blocks, dark/light theme sync,
// responsive scaling, and error handling.

(function() {
    'use strict';

    var MERMAID_CDN = 'https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.min.js';
    var MERMAID_LOADED = false;

    // Theme configuration for light and dark modes
    var THEME_CONFIG = {
        light: {
            theme: 'default',
            themeVariables: {
                primaryColor: '#3b82f6',
                primaryTextColor: '#1f2937',
                primaryBorderColor: '#3b82f6',
                lineColor: '#6b7280',
                secondaryColor: '#dbeafe',
                tertiaryColor: '#f3f4f6',
                background: '#ffffff',
                mainBkg: '#ffffff',
                secondBkg: '#f3f4f6',
                fontFamily: 'Inter, sans-serif'
            }
        },
        dark: {
            theme: 'dark',
            themeVariables: {
                primaryColor: '#3b82f6',
                primaryTextColor: '#f9fafb',
                primaryBorderColor: '#3b82f6',
                lineColor: '#9ca3af',
                secondaryColor: '#1e3a5f',
                tertiaryColor: '#374151',
                background: '#1f2937',
                mainBkg: '#1f2937',
                secondBkg: '#374151',
                fontFamily: 'Inter, sans-serif'
            }
        }
    };

    // Check if page has any mermaid diagrams
    function hasMermaidDiagrams() {
        // Check for ```mermaid code blocks
        var codeBlocks = document.querySelectorAll('pre code.language-mermaid, code.language-mermaid');
        if (codeBlocks.length > 0) return true;

        // Check for <div class="mermaid"> elements
        var mermaidDivs = document.querySelectorAll('.mermaid');
        if (mermaidDivs.length > 0) return true;

        // Check for mermaid code inside pre blocks (without language class)
        var preBlocks = document.querySelectorAll('pre');
        for (var i = 0; i < preBlocks.length; i++) {
            var text = preBlocks[i].textContent.trim();
            if (isMermaidSyntax(text)) return true;
        }

        return false;
    }

    // Check if text looks like mermaid syntax
    function isMermaidSyntax(text) {
        var mermaidKeywords = [
            /^graph\s+(TB|BT|RL|LR|TD)/m,
            /^flowchart\s+(TB|BT|RL|LR|TD)/m,
            /^sequenceDiagram/m,
            /^classDiagram/m,
            /^stateDiagram/m,
            /^erDiagram/m,
            /^journey/m,
            /^gantt/m,
            /^pie/m,
            /^gitGraph/m,
            /^mindmap/m,
            /^timeline/m,
            /^quadrantChart/m,
            /^sankey/m,
            /^xychart/m
        ];

        for (var i = 0; i < mermaidKeywords.length; i++) {
            if (mermaidKeywords[i].test(text)) return true;
        }
        return false;
    }

    // Get current theme mode
    function isDarkMode() {
        return document.documentElement.classList.contains('dark');
    }

    // Convert code blocks to mermaid divs
    function convertCodeBlocks() {
        // Handle <pre><code class="language-mermaid">
        var codeBlocks = document.querySelectorAll('pre code.language-mermaid, code.language-mermaid');
        codeBlocks.forEach(function(code) {
            var pre = code.closest('pre');
            if (pre) {
                var div = document.createElement('div');
                div.className = 'mermaid';
                div.textContent = code.textContent;
                pre.parentNode.replaceChild(div, pre);
            }
        });

        // Handle unmarked pre blocks with mermaid syntax
        var preBlocks = document.querySelectorAll('pre');
        preBlocks.forEach(function(pre) {
            var text = pre.textContent.trim();
            if (isMermaidSyntax(text) && !pre.querySelector('code.language-mermaid')) {
                var div = document.createElement('div');
                div.className = 'mermaid';
                div.textContent = text;
                pre.parentNode.replaceChild(div, pre);
            }
        });
    }

    // Initialize mermaid with current theme
    function initMermaid() {
        if (typeof mermaid === 'undefined') return;

        var themeMode = isDarkMode() ? 'dark' : 'light';
        var config = {
            startOnLoad: false,
            theme: THEME_CONFIG[themeMode].theme,
            themeVariables: THEME_CONFIG[themeMode].themeVariables,
            securityLevel: 'loose',
            fontFamily: 'Inter, sans-serif',
            flowchart: {
                useMaxWidth: true,
                htmlLabels: true,
                curve: 'basis'
            },
            sequence: {
                useMaxWidth: true,
                wrap: true,
                diagramMarginX: 50,
                diagramMarginY: 30
            },
            gantt: {
                useMaxWidth: true
            }
        };

        mermaid.initialize(config);
    }

    // Render all mermaid diagrams
    function renderDiagrams() {
        if (typeof mermaid === 'undefined') return;

        var diagrams = document.querySelectorAll('.mermaid:not([data-processed])');
        diagrams.forEach(function(diagram, index) {
            try {
                var id = 'mermaid-diagram-' + Date.now() + '-' + index;
                diagram.setAttribute('data-processed', 'true');

                mermaid.render(id, diagram.textContent).then(function(result) {
                    diagram.innerHTML = result.svg;
                    diagram.classList.add('mermaid-rendered');
                }).catch(function(error) {
                    console.error('Mermaid render error:', error);
                    diagram.innerHTML = '<div class="mermaid-error">Diagram rendering failed: ' + error.message + '</div>';
                });
            } catch (error) {
                console.error('Mermaid processing error:', error);
            }
        });
    }

    // Load mermaid library from CDN
    function loadMermaid(callback) {
        if (MERMAID_LOADED || typeof mermaid !== 'undefined') {
            if (callback) callback();
            return;
        }

        var script = document.createElement('script');
        script.src = MERMAID_CDN;
        script.async = true;
        script.onload = function() {
            MERMAID_LOADED = true;
            if (callback) callback();
        };
        script.onerror = function() {
            console.error('Failed to load Mermaid library');
        };
        document.head.appendChild(script);
    }

    // Main initialization
    function init() {
        if (!hasMermaidDiagrams()) return;

        loadMermaid(function() {
            convertCodeBlocks();
            initMermaid();
            renderDiagrams();
        });
    }

    // Re-render on theme change
    function setupThemeObserver() {
        var observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.attributeName === 'class') {
                    if (typeof mermaid !== 'undefined') {
                        // Reset and re-render
                        var diagrams = document.querySelectorAll('.mermaid[data-processed]');
                        diagrams.forEach(function(d) {
                            d.removeAttribute('data-processed');
                        });
                        initMermaid();
                        renderDiagrams();
                    }
                }
            });
        });

        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['class']
        });
    }

    // Run on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            init();
            setupThemeObserver();
        });
    } else {
        init();
        setupThemeObserver();
    }
})();
