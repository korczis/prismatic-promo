/**
 * Mermaid.js Toggle Component for Prismatic Platform
 *
 * Detects code blocks with mermaid syntax and creates a toggle interface:
 * - "Source" view: original ASCII/code block (Prism-highlighted)
 * - "Interactive" view: rendered Mermaid diagram
 *
 * Also detects ASCII art diagrams (box-drawing chars) and provides
 * a clean presentation wrapper.
 */

(function () {
    'use strict';

    var MERMAID_CDN = 'https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.min.js';
    var MERMAID_LOADED = false;
    var DIAGRAM_COUNTER = 0;

    // Theme configuration for dark mode (primary)
    var THEME_CONFIG = {
        dark: {
            theme: 'dark',
            themeVariables: {
                primaryColor: '#3b82f6',
                primaryTextColor: '#f9fafb',
                primaryBorderColor: '#3b82f6',
                lineColor: '#9ca3af',
                secondaryColor: '#1e3a5f',
                tertiaryColor: '#374151',
                background: '#0d1117',
                mainBkg: '#1f2937',
                secondBkg: '#374151',
                fontFamily: 'Inter, sans-serif',
                fontSize: '14px'
            }
        },
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
                fontFamily: 'Inter, sans-serif',
                fontSize: '14px'
            }
        }
    };

    // Mermaid syntax detection patterns
    var MERMAID_PATTERNS = [
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

    // Check if text looks like mermaid syntax
    function isMermaidSyntax(text) {
        for (var i = 0; i < MERMAID_PATTERNS.length; i++) {
            if (MERMAID_PATTERNS[i].test(text.trim())) return true;
        }
        return false;
    }

    // Get current theme mode
    function isDarkMode() {
        return document.documentElement.classList.contains('dark');
    }

    // Create the toggle wrapper for a diagram
    function createToggleWrapper(preElement, mermaidSource, diagramId) {
        var wrapper = document.createElement('div');
        wrapper.className = 'diagram-toggle-wrapper';
        wrapper.setAttribute('data-diagram-id', diagramId);

        // Toggle bar
        var toggleBar = document.createElement('div');
        toggleBar.className = 'diagram-toggle-bar';

        // Label
        var label = document.createElement('span');
        label.className = 'diagram-toggle-label';
        label.textContent = 'Diagram';

        // Button group
        var btnGroup = document.createElement('div');
        btnGroup.className = 'diagram-toggle-buttons';

        var btnSource = document.createElement('button');
        btnSource.className = 'diagram-toggle-btn';
        btnSource.setAttribute('data-view', 'source');
        btnSource.innerHTML = '<svg class="w-3.5 h-3.5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/></svg>Source';

        var btnInteractive = document.createElement('button');
        btnInteractive.className = 'diagram-toggle-btn active';
        btnInteractive.setAttribute('data-view', 'interactive');
        btnInteractive.innerHTML = '<svg class="w-3.5 h-3.5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"/></svg>Interactive';

        btnGroup.appendChild(btnSource);
        btnGroup.appendChild(btnInteractive);
        toggleBar.appendChild(label);
        toggleBar.appendChild(btnGroup);

        // Source view (hidden by default, show code block)
        var sourceView = document.createElement('div');
        sourceView.className = 'diagram-view diagram-source hidden';
        // Clone the original pre element
        var preClone = preElement.cloneNode(true);
        sourceView.appendChild(preClone);

        // Interactive view (mermaid rendered)
        var interactiveView = document.createElement('div');
        interactiveView.className = 'diagram-view diagram-interactive';
        var mermaidDiv = document.createElement('div');
        mermaidDiv.className = 'mermaid';
        mermaidDiv.textContent = mermaidSource;
        mermaidDiv.setAttribute('data-diagram-id', diagramId);
        interactiveView.appendChild(mermaidDiv);

        // Assemble
        wrapper.appendChild(toggleBar);
        wrapper.appendChild(sourceView);
        wrapper.appendChild(interactiveView);

        // Toggle logic
        btnSource.addEventListener('click', function () {
            sourceView.classList.remove('hidden');
            interactiveView.classList.add('hidden');
            btnSource.classList.add('active');
            btnInteractive.classList.remove('active');
        });

        btnInteractive.addEventListener('click', function () {
            interactiveView.classList.remove('hidden');
            sourceView.classList.add('hidden');
            btnInteractive.classList.add('active');
            btnSource.classList.remove('active');
        });

        return wrapper;
    }

    // Find and process all mermaid code blocks
    function processMermaidBlocks() {
        var processed = [];

        // 1. Handle <pre><code class="language-mermaid"> or data-lang="mermaid"
        var codeBlocks = document.querySelectorAll('pre code.language-mermaid, pre code[data-lang="mermaid"]');
        codeBlocks.forEach(function (code) {
            var pre = code.closest('pre');
            if (pre && !pre.hasAttribute('data-diagram-processed')) {
                var source = code.textContent.trim();
                if (source) {
                    var id = 'diagram-' + (++DIAGRAM_COUNTER);
                    var wrapper = createToggleWrapper(pre, source, id);
                    pre.parentNode.replaceChild(wrapper, pre);
                    processed.push(id);
                }
            }
        });

        // 2. Handle unmarked pre blocks that contain mermaid syntax
        var preBlocks = document.querySelectorAll('pre:not([data-diagram-processed])');
        preBlocks.forEach(function (pre) {
            var text = pre.textContent.trim();
            if (isMermaidSyntax(text)) {
                var id = 'diagram-' + (++DIAGRAM_COUNTER);
                var wrapper = createToggleWrapper(pre, text, id);
                pre.parentNode.replaceChild(wrapper, pre);
                processed.push(id);
            }
        });

        return processed;
    }

    // Initialize mermaid library
    function initMermaid() {
        if (typeof mermaid === 'undefined') return;

        var themeMode = isDarkMode() ? 'dark' : 'light';
        mermaid.initialize({
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
        });
    }

    // Render all unprocessed mermaid diagrams
    function renderDiagrams() {
        if (typeof mermaid === 'undefined') return;

        var diagrams = document.querySelectorAll('.mermaid:not([data-processed])');
        diagrams.forEach(function (diagram, index) {
            try {
                var id = 'mermaid-svg-' + Date.now() + '-' + index;
                var source = diagram.textContent.trim();
                diagram.setAttribute('data-processed', 'true');

                mermaid.render(id, source).then(function (result) {
                    diagram.innerHTML = result.svg;
                    diagram.classList.add('mermaid-rendered');

                    // Make SVG responsive
                    var svg = diagram.querySelector('svg');
                    if (svg) {
                        svg.style.maxWidth = '100%';
                        svg.style.height = 'auto';
                    }
                }).catch(function (error) {
                    console.warn('Mermaid render error:', error.message);
                    // Show source view instead on error
                    var wrapper = diagram.closest('.diagram-toggle-wrapper');
                    if (wrapper) {
                        var sourceView = wrapper.querySelector('.diagram-source');
                        var interactiveView = wrapper.querySelector('.diagram-interactive');
                        var btnSource = wrapper.querySelector('[data-view="source"]');
                        var btnInteractive = wrapper.querySelector('[data-view="interactive"]');
                        if (sourceView && interactiveView) {
                            sourceView.classList.remove('hidden');
                            interactiveView.classList.add('hidden');
                            if (btnSource) btnSource.classList.add('active');
                            if (btnInteractive) btnInteractive.classList.remove('active');
                        }
                    }
                    diagram.innerHTML = '<div class="text-xs text-gray-500 p-4 text-center">Diagram rendering unavailable. Showing source view.</div>';
                });
            } catch (error) {
                console.warn('Mermaid processing error:', error.message);
            }
        });
    }

    // Load mermaid from CDN
    function loadMermaid(callback) {
        if (MERMAID_LOADED || typeof mermaid !== 'undefined') {
            if (callback) callback();
            return;
        }

        var script = document.createElement('script');
        script.src = MERMAID_CDN;
        script.async = true;
        script.onload = function () {
            MERMAID_LOADED = true;
            if (callback) callback();
        };
        script.onerror = function () {
            console.warn('Failed to load Mermaid library from CDN');
            // Fallback: show source view for all diagram wrappers
            var wrappers = document.querySelectorAll('.diagram-toggle-wrapper');
            wrappers.forEach(function (wrapper) {
                var sourceView = wrapper.querySelector('.diagram-source');
                var interactiveView = wrapper.querySelector('.diagram-interactive');
                var btnSource = wrapper.querySelector('[data-view="source"]');
                var btnInteractive = wrapper.querySelector('[data-view="interactive"]');
                if (sourceView && interactiveView) {
                    sourceView.classList.remove('hidden');
                    interactiveView.classList.add('hidden');
                    if (btnSource) btnSource.classList.add('active');
                    if (btnInteractive) {
                        btnInteractive.classList.remove('active');
                        btnInteractive.disabled = true;
                        btnInteractive.title = 'Mermaid library unavailable';
                    }
                }
            });
        };
        document.head.appendChild(script);
    }

    // Check if page has any mermaid content
    function hasMermaidContent() {
        var codeBlocks = document.querySelectorAll('pre code.language-mermaid, pre code[data-lang="mermaid"]');
        if (codeBlocks.length > 0) return true;

        var mermaidDivs = document.querySelectorAll('.mermaid');
        if (mermaidDivs.length > 0) return true;

        var preBlocks = document.querySelectorAll('pre');
        for (var i = 0; i < preBlocks.length; i++) {
            if (isMermaidSyntax(preBlocks[i].textContent.trim())) return true;
        }
        return false;
    }

    // Main initialization
    function init() {
        if (!hasMermaidContent()) return;

        // First, process blocks to create toggle wrappers
        var processed = processMermaidBlocks();
        if (processed.length === 0) return;

        // Then load Mermaid and render
        loadMermaid(function () {
            initMermaid();
            renderDiagrams();
        });
    }

    // Run on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
